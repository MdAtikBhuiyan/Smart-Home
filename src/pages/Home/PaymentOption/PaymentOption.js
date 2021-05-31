import React, { useEffect, useMemo, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router';
import card from '../../../images/card.png';
import card_option from '../../../images/card-option.png';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import './Payment.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import { useSelector, useDispatch } from 'react-redux';
import { setPayment } from '../../../redux/slices/paymentSlice';

const PaymentOption = () => {

    const { id } = useParams();

    const [device, setDevice] = useState({});
    useEffect(() => {
        fetch(`https://afternoon-wildwood-65572.herokuapp.com/device/${id}`)
            .then(res => res.json())
            .then(data => setDevice(data))
    }, [])

    const { title, price, version } = device;
    const [payment, setPayment] = useState(false);

    const userInfo = useSelector(state => state.loginReducer)
    console.log('object,userInfo',userInfo)

    const handlePayment = (payId, card) => {
        const date = new Date()
        const sellTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const buyingInfo = {
            title,
            price,
            version,
            payId,
            card,
            sellTime: sellTime,
            userName: userInfo.name,
            userEmail: userInfo.email,
            login: userInfo.isSignedIn
        }
        console.log('ad buy data', buyingInfo);
        fetch('https://afternoon-wildwood-65572.herokuapp.com/buyDevice', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buyingInfo)
        })
            .then(res => console.log("add buy Product successfully", res))

    }

    let history = useHistory()
    const handleSeeOrderBtn = () => {
        history.push('/myDevice')
    }

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    return (
        <div className='payment-section'>
            <Header></Header>
            {
                payment ||
                <div className="payment-area mt-4">
                    <h2>Payment Option</h2>
                    <div className="pay-img">
                        <img src={card} alt="" />
                        {/* <img src={img2} alt="" /> */}
                    </div>
                    <div className="payment-form-section pb-5">
                        <Elements stripe={stripePromise}>
                            <SplitCardForm handlePayment={handlePayment} setPayment={setPayment}></SplitCardForm>
                        </Elements>
                    </div>

                </div>
            }
            {payment &&
                <Container>
                    <div className="confirm-box">
                        <h3> &#10004; Your Buy is Confirmed</h3>
                        <div className="product-details">
                            <Table>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">Device Name</td>
                                        <td colSpan="2"> {title} </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Device Price</td>
                                        <td colSpan="2">$ {price} </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Device Quantity</td>
                                        <td colSpan="2"> 1 </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Device Verion</td>
                                        <td colSpan="2"> {version} </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Buy Time</td>
                                        <td colSpan="2">  {
                                            new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                                        } </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Total Price</td>
                                        <td colSpan="2">$ {price} </td>
                                    </tr>

                                </tbody>
                            </Table>
                            <button onClick={handleSeeOrderBtn} className="btn btn-primary see-orders-btn">
                                see your all Buy Devices
                                    </button>
                        </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default PaymentOption;