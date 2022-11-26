import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as helpers from '../../../../utils/helpers/form';
import * as validator from '../../../../utils/validators/category';
import * as categoriesService from '../../../../services/admin/categories';

import Input from "../../../shared/Input/Input";
import ClientError from '../../../shared/ClientError/ClientError';
import ServerError from '../../../shared/ServerError/ServerError';

import styles from './CreateCategory.module.css'

function CreateCategory() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        image: '',
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [nameError, setNameError] = useState('');
    const [imageError, setImageError] = useState('');
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, nameError, imageError]);

    const submitHandler = (e) => {
        e.preventDefault();

        setNameError(validator.validName(values.name));
        setImageError(validator.validImage(values.image));

        if (nameError || imageError) {
            return;
        }

        categoriesService.create(values.name, values.image)
            .then((data) => {
                console.log(data);
                // if (data.message) {
                //     setServerError(data);
                //     return;
                // }

                navigate('/');
            })
            .catch((err) => {
                console.error(err)
            });
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const validateName = () => {
        setNameError(validator.validName(values.name));
    }

    const validateImage = () => {
        setImageError(validator.validImage(values.image));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [nameError, imageError]));
    };

    return (
        <section className="section section-background">
            {serverError && <ServerError errors={serverError} />}
            <div className="section-title-wrapper">
                <h2 className="section-title">Create Category</h2>
            </div>
            <div className={styles["create-category-content-wrapper"]}>
                <form className={styles["create-category-form"]} onSubmit={submitHandler}>
                    <div className="form-wrapper">
                        <Input
                            name="name"
                            type="text"
                            label="Name"
                            value={values.name}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateName}
                        />
                        {nameError && <ClientError error={nameError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="image"
                            type="text"
                            label="Image"
                            value={values.image}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateImage}
                        />
                        {imageError && <ClientError error={imageError} />}
                    </div>
                    <button className="btn btn-center" disabled={isDisabled}>Create</button>
                </form>
                <div className={styles["create-category-img-wrapper"]}>
                    <img className={`${styles["create-category-img"]} img-shadow`} src="./../../img/bunch-of-flowers-363169_1920.jpg" alt="wedding_flowers" />
                    <img className={`${styles["create-category-img"]} img-shadow`} src="./../../img/wedding-905240_1920.jpg" alt="wedding_table" />
                    <img className={`${styles["create-category-img"]} img-shadow`} src="./../../img/wedding-1760024_1920.jpg" alt="wedding_invitations" />
                </div>
            </div>
        </section>
    );
}

export default CreateCategory;