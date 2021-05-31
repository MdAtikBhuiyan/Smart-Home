import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import logo from '../images/sign-logo.png';
import { useForm } from "react-hook-form";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setOption, setUser, userSignOut } from "../redux/slices/loginSlice";
import { useHistory, useLocation } from 'react-router';
import Header from './../components/Header';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/devices" } };

    const dispatch = useDispatch()
    let option = useSelector((state) => state.loginReducer.option);
    let user = useSelector((state) => state.loginReducer);

    const loginWithGogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                dispatch(setUser(userDetails))
                history.replace(from)
            }).catch((error) => {
                var errorMessage = error.message;
                const userDetails = { ...user }
                userDetails.error = error.message;
                dispatch(setUser(userDetails))
            });
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = { ...user };
            signOutUser.name = '';
            signOutUser.email = '';
            signOutUser.isSignedIn = false;
            dispatch(userSignOut(signOutUser))
        }).catch((error) => {
            // An error happened.
        });
    }

console.log(user)
    return (

        <section className="login-area">

            {   

                user.isSignedIn ?
                <div className='logout-area'>
                    <Header></Header>
                    <div className='logout-info'>
                        <p>Already Logged In</p>
                        <div className='user-logout-info'>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                        <button onClick={signOut} className="btn btn-danger mt-4">Logout</button>
                    </div>
                </div>

            :

            <Row>

                <Col md={7}>
                    <div className="login-bg">
                    </div>
                </Col>

                <Col md={5}>
                    <Container>

                        <div className="login-content">
                            <img src={logo} alt="" />
                        </div>

                        <div className="form-content">

                            {
                                option === 'login' &&

                                <div className="signIn-area">
                                    <h3> Sign In</h3>
                                    <form onSubmit={''}>
                                        <label>Email</label>
                                        <input
                                            placeholder="Email"
                                            className='form-control'
                                            {...register("email", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "invalid email address"
                                                }
                                            })} />
                                        <p style={{ color: '#ff0052' }}>{errors.email && errors.email.message}</p>

                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className='form-control'
                                            {...register("password", {
                                                required: true,
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must have at least 8 characters"
                                                }
                                            })} />
                                        <p style={{ color: '#ff0052' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                                        {/* <p style={{ color: '#ff0052' }}> {user.error} </p> */}
                                        <button type="submit" className='btn col-12 btn-primary login-btn'>Sign In</button>

                                    </form>

                                    <p className='optional-option'>Don’t have an account?  <button onClick={() => {
                                        dispatch(setOption('signup'));
                                    }}>
                                        <span>Sign Up</span>
                                    </button>
                                    </p>

                                    <div className='google-login text-center mt-4'>
                                        <button onClick={loginWithGogle} className="btn">
                                            Login With Google
                                        <span>
                                                <FontAwesomeIcon icon={faGoogle} />
                                            </span>
                                        </button>
                                    </div>

                                </div>
                            }
                            {
                                option === 'signup' &&
                                <div className="signUp-area">
                                    <h3> Sign Up</h3>

                                    <form onSubmit={e => e.preventDefault()}>

                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className='form-control'
                                            {...register("name", { required: true })} />
                                        <p style={{ color: '#ff0052' }}>{errors.name && "Reuired"}</p>

                                        <label>Email</label>
                                        <input
                                            placeholder="Email"
                                            type='email'
                                            className='form-control'
                                            {...register("email", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "invalid email address"
                                                }
                                            })} />
                                        <p style={{ color: '#ff0052' }}>{errors.email && errors.email.message}</p>

                                        <label>Password</label>
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className='form-control'
                                            {...register("password", {
                                                required: "You must specify a password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must have at least 8 characters"
                                                }
                                            })} />
                                        <p style={{ color: '#ff0052' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className='form-control'
                                            {...register('confirmPassword')} />
                                        <p style={{ color: '#ff0052' }}>{errors.confirm_password && <span>{errors.confirm_password.message}</span>}</p>

                                        {/* <p style={{ color: '#ff0052' }}> {user.error} </p> */}

                                        <input type="submit" onClick={handleSubmit('')} className='btn col-12 btn-primary login-btn' value='Sign Up' />

                                    </form>

                                    <p className='optional-option'>Already have an account?  <button onClick={() => {
                                        dispatch(setOption('login'))
                                    }}>
                                        <span>Login</span>
                                    </button>
                                    </p>

                                    <div className='google-login text-center mt-4'>
                                        <button onClick={loginWithGogle} className="btn">
                                            SignUp With Google
                                        <span>
                                                <FontAwesomeIcon icon={faGoogle} />
                                            </span>
                                        </button>
                                    </div>

                                </div>
                            }
                        </div>
                    </Container>
                </Col>
            </Row>
            }

        </section>

    );
};

export default Login;