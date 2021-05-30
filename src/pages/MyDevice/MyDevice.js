import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import './MyDevice.css';
import { useSelector } from 'react-redux';
import ShowBuyDevice from '../../components/ShowBuyDevice';

const MyDevice = () => {

    const email = useSelector(state => state.loginReducer.email)
    console.log(email)

    const [devices, setDevice] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/showBuyDevice/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDevice(data)
            })
    }, [])

    console.log(devices)

    return (
        <div className='my-device'>
            <Header></Header>
            {   
                devices.length &&
                <Container className='mt-5'>

                {
                    devices.length > 0 ?
                        <Row>
                            {

                                devices.slice(0).reverse().map(device => <ShowBuyDevice buyDevice={device} key={device._id}></ShowBuyDevice>)

                            }
                        </Row>
                        :
                        <div className='no-device'>
                            <p>You Haven't Buy Any Device</p>
                        </div>
                }
            </Container>
            }
        </div>
    );
};

export default MyDevice;