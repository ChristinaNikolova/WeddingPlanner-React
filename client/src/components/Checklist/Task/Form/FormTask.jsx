import { useEffect, useState } from 'react';

import * as validator from '../../../../utils/validators/task';
import * as helpers from '../../../../utils/helpers/form';
import { formNames, styleNames } from '../../../../utils/constants/global';

import ServerError from '../../../shared/Errors/ServerError/ServerError';
import ClientError from '../../../shared/Errors/ClientError/ClientError';
import Input from '../../../shared/Tags/Input/Input';
import TextArea from '../../../shared/Tags/TextArea/TextArea';
import FormButton from '../../../shared/Buttons/Form/FormButton';

function FormTask({ title, description, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    const [values, setValues] = useState({
        title: title,
        description: description,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [currentStyle, setCurrentStyle] = useState(styleNames.NONE);

    useEffect(() => {
        if (formName === formNames.UPDATE) {
            setCurrentStyle(styleNames.FLEX);
        }
    }, []);

    useEffect(() => {
        checkDisabled();
    }, [values, titleError, descriptionError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateTitle = () => {
        setTitleError(validator.validTitle(values.title));
    };

    const validateDescription = () => {
        setDescriptionError(validator.validDescription(values.description));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [titleError, descriptionError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setTitleError(validator.validTitle(values.title));
        setDescriptionError(validator.validDescription(values.description));

        if (titleError || descriptionError) {
            return;
        }

        onSubmitHandler(e, values.title, values.description);
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
                description: '',
            });
        }
    }

    return (
        <div className="form-wrapper-center" style={{ display: currentStyle }}>
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
                    <TextArea
                        name="description"
                        label="Description"
                        value={values.description}
                        rows={4}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateDescription}
                    />
                    {descriptionError && <ClientError error={descriptionError} />}
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

export default FormTask;