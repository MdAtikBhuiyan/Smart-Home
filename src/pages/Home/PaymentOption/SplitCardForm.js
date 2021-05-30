import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPayment } from '../../../redux/slices/paymentSlice';
import './Payment.css'

const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: '16px',
                    color: "#fff",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#ff4e4e"
                }
            }
        }),
        []
    );

    return options;
};

const SplitCardForm = ({setPayment,handlePayment}) => {

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const dispatch = useDispatch()
    const [paymentError, setPaymentError] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    const handleSubmit = async event => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);

        if (payload.error) {
            console.log('error', payload.error.message);
            setPaymentError(payload?.error.message)
        }
        else {
            console.log('done', payload?.paymentMethod.id);

            const id = payload?.paymentMethod.id
            const card = payload?.paymentMethod?.card?.brand;
            console.log(card);
            setPaymentError('');
            handlePayment(id, card);
            setPayment(true)
        }
    };


    return (
        <form onSubmit={handleSubmit} className='payment-form'>
            <label>
                <span>Card number</span>
                
        <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <label>
                <span>Expiration date</span>
        <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <label>
                <span>CVC</span>
        <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            {
                paymentError && <p className="text-danger mt-3 font-weight-bold">{paymentError}</p>
            }
            <button type="submit" className='btn btn-primary px-4 mt-4' disabled={!stripe}>
                Payment
            </button>
        </form>
    );
};

export default SplitCardForm;