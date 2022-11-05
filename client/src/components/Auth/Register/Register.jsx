import { useState } from 'react';
import './Register.css';

function Register() {
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repass: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(values);
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const blurHandler = (e) => {
        console.log('blur');
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
                            value={values.email}
                        />
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            value={values.firstName}
                        />
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            value={values.lastName}
                        />
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={values.password}
                        />
                    </div>
                    <div className="register-form-wrapper">
                        <label htmlFor="repass">Repeat Password</label>
                        <input
                            id="repass"
                            type="password"
                            name="repass"
                            onChange={changeHandler}
                            value={values.repass}
                        />
                    </div>
                    <button className="btn" disabled={values}>Register</button>
                </form>
            </div>
        </section>
    );
}

export default Register;