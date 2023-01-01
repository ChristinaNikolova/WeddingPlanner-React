import { useState, useEffect } from 'react';

import * as validator from '../../../../utils/validators/subtask';
import * as helpers from '../../../../utils/helpers/form';
import { formNames } from '../../../../utils/constants/global';

import ClientError from '../../../shared/Errors/ClientError/ClientError';
import ServerError from '../../../shared/Errors/ServerError/ServerError';
import TextArea from '../../../shared/Tags/TextArea/TextArea';
import Button from '../../../shared/Wrappers/Button/Button';

function FormSubtask({ description, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    const [values, setValues] = useState({
        description: description,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [descriptionError, setDescriptionError] = useState('');
    const [currentStyle, setCurrentStyle] = useState('none');

    useEffect(() => {
        if (formName === formNames.UPDATE) {
            setCurrentStyle('flex');
        }
    }, []);

    useEffect(() => {
        checkDisabled();
    }, [values, descriptionError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateDescription = () => {
        setDescriptionError(validator.validDescription(values.description));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [descriptionError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setDescriptionError(validator.validDescription(values.description));

        if (descriptionError) {
            return;
        }

        onSubmitHandler(e, values.description);
        setInputsToDefaultValues();
    }

    const onCancelFormHelperHandler = (e) => {
        setInputsToDefaultValues();
        onCancelFormHandler(e);
    }

    const setInputsToDefaultValues = () => {
        if (formName !== formNames.UPDATE) {
            setValues({
                description: '',
            });
        }
    }

    return (
        <div className="form-wrapper-center" style={{ display: currentStyle }}>
            <form className="form-width form-error-message-width" onSubmit={onSubmitHelperHandler}>
                {serverError && <ServerError errors={serverError} />}
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
                <Button
                    formName={formName}
                    isDisabled={isDisabled}
                    onCancelFormHandler={onCancelFormHelperHandler}
                />
            </form>
        </div>
    );
}

export default FormSubtask;