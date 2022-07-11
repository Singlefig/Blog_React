import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: { isLoggedIn: boolean }) => state);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isCredentialsValid, setIsCredentialsValid] = useState(true);
    const [isLoginSubmitDisabled, setIsLoginSubmitDisabled] = useState(true);
    const [isRegistrationSubmitDisabled, setIsRegistrationSubmitDisabled] = useState(true);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (loginEmail.length > 0 && loginPassword.length >= 8) {
            setIsLoginSubmitDisabled(false);
        } else {
            setIsLoginSubmitDisabled(true);
        }
    }, [loginEmail, loginPassword]);

    useEffect(() => {
        if (name.length > 0 && surname.length > 0 && registerEmail.length > 0 && registerPassword.length >= 8) {
            setIsRegistrationSubmitDisabled(false);
        } else {
            setIsRegistrationSubmitDisabled(true);
        }
    }, [name, surname, registerEmail, registerPassword]);

    const handleOnLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:4000/profiles?email=${loginEmail}&password=${loginPassword}`);
        const isValid = res.data.length > 0;
        setIsCredentialsValid(isValid);
        if (isValid) {
            dispatch({
                type: 'login',
                payload: { ...res.data, isLoggedIn: true }
            });
            navigate('/');
        }
        setLoginEmail('');
        setLoginPassword('');

    };

    const handleOnRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const users = await axios.get(`http://localhost:4000/profiles`);
        const isEmailFree = users.data.every((el: { email: string }) => el.email !== registerEmail);
        const lastUserId = users.data[users.data.length - 1].id;
        if (isEmailFree) {
            const res = await axios.post(`http://localhost:4000/profiles`, {
                id: +lastUserId + 1,
                name: name,
                surname: surname,
                email: registerEmail,
                password: registerPassword,
            });
            if (res.status === 200) {
                dispatch({
                    type: 'login',
                    payload: {
                        email: registerEmail,
                        password: registerPassword,
                        name: name,
                        surname: surname,
                        isLoggedIn: true
                    }
                });
                navigate('/');
            }
        }
    };

    return (
        <div id="login" className="login-page-container">
            <div className="login-container">
                <form className="login-form" onSubmit={handleOnLoginSubmit}>
                    <p className="login-title">Hi! Please login :)</p>
                    <div className="inputs-container">
                        <div className="inputs">
                            <input
                                className="login-input"
                                type={"email"}
                                placeholder="Email *"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <input
                                className="login-input"
                                type={"password"}
                                placeholder="Password *"
                                required
                                value={loginPassword}
                                min={8}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        {!isCredentialsValid ? <span className="error-login">Wrong email or password. Please try again</span> : null}
                    </div>
                    <button
                        className={isLoginSubmitDisabled ? 'login-btn disabled-btn' : 'login-btn'}
                        type="submit"
                        disabled={isLoginSubmitDisabled}
                    >
                        Sign In
                    </button>
                    <div className="sign-up-flow">
                        <img src={require("../../assets/icons/info.svg").default} width={24} height={24} alt="info" />
                        <p>Don't have account? Go to Sign Up!</p>
                    </div>
                </form>
            </div>
            <div className="register-container">
                <form className="register-form" onSubmit={handleOnRegisterSubmit}>
                    <p className="register-title">Sign Up</p>
                    <div className="inputs">
                        <input
                            className="register-input"
                            type={"text"}
                            placeholder="Name *"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="register-input"
                            type={"text"}
                            placeholder="Surname *"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <input
                            className="register-input"
                            type={"email"}
                            placeholder="Email *"
                            required
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <input
                            className="register-input"
                            type={"password"}
                            placeholder="Password *"
                            required
                            value={registerPassword}
                            min={8}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <input
                            className="register-input"
                            type={"password"}
                            placeholder="Repeat password *"
                            required
                            value={registerRepeatPassword}
                            min={8}
                            onChange={(e) => setRegisterRepeatPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={isRegistrationSubmitDisabled ? 'register-btn disabled-btn' : 'register-btn'}
                        type="submit"
                        disabled={isRegistrationSubmitDisabled}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        email: state.email,
        password: state.password,
        isLoggedIn: state.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (email: string, password: string) => dispatch({ type: 'login', payload: { email, password } }),
        register: (name: string, surname: string, email: string, password: string) => dispatch({ type: 'register', payload: { name, surname, email, password } }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
