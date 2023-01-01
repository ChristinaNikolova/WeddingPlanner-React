import { useState, useEffect } from 'react';

import * as helpers from '../../../../utils/helpers/form';
import * as validator from '../../../../utils/validators/category';
import * as constants from '../../../../utils/constants/images';

import Input from '../../../shared/Tags/Input/Input';
import ClientError from '../../../shared/Errors/ClientError/ClientError';
import ServerError from '../../../shared/Errors/ServerError/ServerError';
import FormButton from '../../../shared/Buttons/Form/FormButton';
import Bottom from '../../../shared/Images/Bottom/Bottom';

import styles from './FormCategory.module.css'

function FormCategory({ formName, name, image, serverError, onSubmitHandler, onCancelFormHandler }) {
    const [values, setValues] = useState({
        name: name,
        image: image,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [nameError, setNameError] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, nameError, imageError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateName = () => {
        setNameError(validator.validName(values.name));
    };

    const validateImage = () => {
        setImageError(validator.validImage(values.image));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [nameError, imageError]));
    };

    const onsubmitHelperHandler = (e) => {
        e.preventDefault();

        setNameError(validator.validName(values.name));
        setImageError(validator.validImage(values.image));

        if (nameError || imageError) {
            return;
        }

        onSubmitHandler(values.name, values.image);
    };

    return (
        <section className="section section-background">
            {serverError && <ServerError errors={serverError} />}
            <div className="section-title-wrapper">
                <h2 className="section-title">{formName} Category</h2>
            </div>
            <div className="form-wrapper-center">
                <form onSubmit={onsubmitHelperHandler} className={[styles["create-category-form"], "form-width"].join(' ')}>
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
                            type="url"
                            label="Image"
                            value={values.image}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateImage}
                        />
                        {imageError && <ClientError error={imageError} />}
                    </div>
                    <FormButton
                        formName={formName}
                        isDisabled={isDisabled}
                        onCancelFormHandler={onCancelFormHandler}
                    />
                </form>
                <Bottom
                    first={constants.bottom.FIRST}
                    second={constants.bottom.SECOND}
                    third={constants.bottom.THIRD}
                />
            </div>
        </section>
    );
}

export default FormCategory;