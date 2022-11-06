import { useState, useEffect } from 'react';
import * as authService from '../../../services/auth';
import * as validator from '../../../utils/validators/auth';
import * as helpers from '../../../utils/helpers/form';
import './Register.css';

function Register() {
    //TODO CSS MOdule
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repass: '',
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repassError, setRepassError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, emailError, firstNameError, lastNameError, passwordError, repassError]);

    const submitHandler = (e) => {
        e.preventDefault();

        setEmailError(validator.validEmail(values.email));
        setFirstNameError(validator.validName(values.firstName));
        setLastNameError(validator.validName(values.lastName));
        setPasswordError(validator.validPassword(values.password));
        setRepassError(validator.validPasswordMatch(values.password, values.repass));

        if (emailError || firstNameError || lastNameError || passwordError || repassError) {
            return;
        }

        authService.register(values.firstName, values.lastName, values.email, values.password)
            .then((data) => {
                console.log(data);
            });
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const validateEmail = () => {
        setEmailError(validator.validEmail(values.email));
    }

    const validateFirstName = () => {
        setFirstNameError(validator.validName(values.firstName));
    }

    const validateLastName = () => {
        setLastNameError(validator.validName(values.lastName));
    }

    const validatePassword = () => {
        setPasswordError(validator.validPassword(values.password));
    }

    const validateRepass = () => {
        setRepassError(validator.validPasswordMatch(values.password, values.repass));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [emailError, firstNameError, lastNameError, passwordError, repassError]));
    }

    return (
        <section className="register section">
            <div className="register-title-wrapper">
                <h2 className="register-title">Register</h2>
                <p className="register-content">
                    Please complete the register form to start planning you wedding day
                </p>
            </div>
            <div className="register-content-wrapper">
                <img className="register-img" src="./img/wedding-634526_1280.jpg" alt="bride_accessories" />
                <form onSubmit={submitHandler} className="register-form">
                    <div className="register-form-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            onBlur={validateEmail}
                            value={values.email}
                        />
                        {emailError && <p className="client-error">{emailError}</p>}
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            onBlur={validateFirstName}
                            value={values.firstName}
                        />
                        {firstNameError && <p className="client-error">{firstNameError}</p>}
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            onBlur={validateLastName}
                            value={values.lastName}
                        />
                        {lastNameError && <p className="client-error">{lastNameError}</p>}
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            onBlur={validatePassword}
                            value={values.password}
                        />
                        {passwordError && <p className="client-error">{passwordError}</p>}
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="repass">Repeat Password</label>
                        <input
                            id="repass"
                            type="password"
                            name="repass"
                            onChange={changeHandler}
                            onBlur={validateRepass}
                            value={values.repass}
                        />
                        {repassError && <p className="client-error">{repassError}</p>}
                    </div>
                    <button className="btn" disabled={isDisabled}>Register</button>
                </form>
            </div>
        </section>
    );
}

export default Register;