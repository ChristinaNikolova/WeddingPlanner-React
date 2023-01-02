import { useState, useEffect } from 'react';

import * as validator from '../../../utils/validators/cost';
import * as helpers from '../../../utils/helpers/form';
import { formNames, styleNames } from '../../../utils/constants/global';

import FormButton from '../../shared/Buttons/Form/FormButton';
import ClientError from '../../shared/Errors/ClientError/ClientError';
import ServerError from '../../shared/Errors/ServerError/ServerError';
import Input from '../../shared/Tags/Input/Input';

function FormCost({ title, price, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    const [values, setValues] = useState({
        title: title,
        price: price,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [priceError, setPriceError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, titleError, priceError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateTitle = () => {
        setTitleError(validator.validTitle(values.title));
    };

    const validatePrice = () => {
        setPriceError(validator.validPrice(values.price));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [titleError, priceError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setTitleError(validator.validTitle(values.title));
        setPriceError(validator.validPrice(values.price));

        if (titleError || priceError) {
            return;
        }

        onSubmitHandler(e, values.title, values.price);
        setInputsToDefaultValues();
    }

    const onCancelFormHelperHandler = (e) => {
        setInputsToDefaultValues();
        onCancelFormHandler(e);
    }

    const setInputsToDefaultValues = () => {
        if (formName !== formNames.UPDATE) {
            setValues({
                title: '',
                price: '',
            });
        }
    }

    return (
        <div className="form-wrapper-center" style={{ display: styleNames.NONE }}>
            <form onSubmit={onSubmitHelperHandler} className="form-width form-error-message-width">
                {serverError && <ServerError errors={serverError} />}
                <div className="form-wrapper">
                    <Input
                        name="title"
                        type="text"
                        label="Title"
                        value={values.title}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateTitle}
                    />
                    {titleError && <ClientError error={titleError} />}
                </div>
                <div className="form-wrapper">
                    <Input
                        name="price"
                        type="number"
                        label="Price"
                        value={values.price}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validatePrice}
                    />
                    {priceError && <ClientError error={priceError} />}
                </div>
                <FormButton
                    formName={formName}
                    isDisabled={isDisabled}
                    onCancelFormHandler={onCancelFormHelperHandler}
                />
            </form>
        </div>
    );
}

export default FormCost;