import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as helpers from '../../../utils/helpers/form';
import * as authService from '../../../services/auth';
import ClientError from '../../shared/ClientError/ClientError';
import Input from '../../shared/Input/Input';
import ServerError from '../../shared/ServerError/ServerError';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, emailError, passwordError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (emailError || passwordError) {
            return;
        }

        authService.login(values.email, values.password)
            .then((data) => {
                if (!data.accessToken) {
                    setServerError(data.message);
                    return;
                }

                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('authToken', data.accessToken);
                sessionStorage.setItem('userId', data._id);
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // const validateEmail = () => {
    //     setEmailError(validator.validEmail(values.email));
    // }

    // const validatePassword = () => {
    //     setPasswordError(validator.validPassword(values.password));
    // }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [emailError, passwordError]));
    };

    return (
        <section className="login section">
            {serverError && <ServerError errors={serverError} />}
            <div className="login-title-wrapper">
                <h2 className="login-title">Login</h2>
                <p className="login-content">
                    Please complete the login. You don't have an account? Go to <Link to="/register">Register</Link>
                </p>
            </div>
            <div className="login-content-wrapper">
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="login-form-wrapper">
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            value={values.email}
                            onChangeHandler={changeHandler}
                            onBlurHandler={null}
                        />
                        {emailError && <ClientError error={emailError} />}
                    </div>
                    <div className="login-form-wrapper">
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            value={values.password}
                            onChangeHandler={changeHandler}
                            onBlurHandler={null}
                        />
                        {passwordError && <ClientError error={passwordError} />}
                    </div>
                    <button className="btn">Login</button>
                </form>
                <img className="login-img" src="./img/flowers-3992893_1920.jpg" alt="wedding_accessories" />
            </div>
        </section>
    );
}

export default Login;