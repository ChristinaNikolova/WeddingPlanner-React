import { useState, useEffect } from 'react';

import * as validator from '../../../utils/validators/note';
import * as helpers from '../../../utils/helpers/form';

import ClientError from '../../shared/Errors/ClientError/ClientError';
import ServerError from '../../shared/Errors/ServerError/ServerError';
import TextArea from '../../shared/Tags/TextArea/TextArea';

import styles from './FormNote.module.css';

function FormNote({ description, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    const [values, setValues] = useState({
        description: description,
    });
    const [descriptionError, setDescriptionError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        checkDisabled();
    }, [values, descriptionError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const validateDescription = () => {
        setDescriptionError(validator.validDescription(values.description));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [descriptionError]));
    }

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setDescriptionError(validator.validDescription(values.description));

        if (descriptionError) {
            return;
        }

        onSubmitHandler(values.description);
    }

    return (
        <div className={styles["note-content-form-wrapper"]} >
            <form className={[styles["note-form"], "form-error-message-width", "form-custom-width"].join(' ')} onSubmit={onSubmitHelperHandler}>
                {serverError && <ServerError errors={serverError} />}
                <div className="form-wrapper">
                    <TextArea
                        name="description"
                        label="Note"
                        value={values.description}
                        rows="10"
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateDescription}
                    />
                    {descriptionError && <ClientError error={descriptionError} />}
                </div>
                <div className={styles["note-btns-wrapper"]}>
                    <button disabled={isDisabled} className="btn btn-center">{formName}</button>
                    <button onClick={onCancelFormHandler} className="btn btn-center">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default FormNote;