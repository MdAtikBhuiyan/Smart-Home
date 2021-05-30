import React from 'react';
import './Home.css';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import logo from '../../images/sign.png'
import rectangle from '../../images/Rectangle -homepng.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faLaptopHouse, faMicrophoneAlt, faMobileAlt, faWifi } from '@fortawesome/free-solid-svg-icons'


const Home = () => {

    const history = useHistory();
    const handleGetClick = () => {
        history.push('/login')
    }
    
    return (
        <section className='home-area'>

            <Row>
                <Col md={7}>
                    <div className="home-content">
                        <h2 className="home-logo">
                            Smart Home
                            <span><img src={logo} alt="" /></span>
                        </h2>
                        <div className="home-text">
                            <h1>
                                A Dashboard UI kit for IOT monitoring
                            </h1>
                            <div className="social-icon mt-4">
                                <span><FontAwesomeIcon icon={faLaptopHouse} /></span>
                                <span><FontAwesomeIcon icon={faWifi} /></span>
                                <span><FontAwesomeIcon icon={faMobileAlt} /></span>
                                <span><FontAwesomeIcon icon={faMicrophoneAlt} /></span>
                            </div>
                            <div className="btn-area mt-4">
                                <button onClick={handleGetClick} className="btn btn-primary px-3 py-2 my-5 text-capitalize"> Click here to get this service</button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={5}>
                    <div className="signIn-option">
                        <img src={rectangle} alt="" />
                    </div>
                </Col>
            </Row>

        </section>
    );
};

export default Home;