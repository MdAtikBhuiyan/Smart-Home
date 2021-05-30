import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Switch from "react-switch";

const ShowBuyDevice = ({ buyDevice }) => {
    console.log('object', buyDevice);
    const { title, price, version, sellTime } = buyDevice;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [connecteds, setConnecteds] = useState(false);

    const onSubmit = (data,e) => {
        setConnecteds(true);
        setChecked(true);
        console.log('target', e.target)
    }
    console.log('con', connecteds);

    const [checked, setChecked] = useState(false);
    console.log(checked)
    const handleChange = nextChecked => {
        if (connecteds === false) {
            setChecked(false)
            setShow(true)
        }
        if (connecteds === true) {
            setChecked(false)
            setConnecteds(false)
        }
    }



    return (
        <>
            <Col md={6}>
                <div className="buy-devices-details">
                    <Row>
                        <Col md={6}>
                            <div className="buy-devices">
                                <h6>Device Name</h6>
                                <p> {title}</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <h6>Device Version</h6>
                            <p> {version}</p>
                        </Col>

                    </Row>
                    <div className='btn-center d-flex justify-content-center gap-5 mt-3'>
                        {/* <button onClick={handleShow} className="btn btn-primary my-device-btn">
                            Connect Your Device
                        </button> */}
                        {
                            connecteds ?
                                <h5 className='connected text-capitalize'> your device is connected</h5>
                                :
                                <h5 className='disconnected'>Connect Your Device</h5>
                        }
                        <label>
                            <Switch
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onChange={handleChange}
                                checked={checked} />
                        </label>
                    </div>
                </div>
            </Col>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Connect Your Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        connecteds ?
                            <p>Your Device is Connected</p>
                            :
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>IP Address</label>
                                <input
                                    className='form-control' placeholder='Enter Your IP Address'
                                    {...register("IPaddress", { required: true })} />

                                <p style={{ color: '#ff0052', margin: '0' }}> {errors.IPaddress && <span>please give your IP Adress</span>}</p>

                                <button className="btn btn-primary">Connect</button>
                            </form>

                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowBuyDevice;