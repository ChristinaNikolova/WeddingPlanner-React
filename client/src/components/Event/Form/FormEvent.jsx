import { useState, useEffect, useRef } from 'react';

import { getDifference, parseDate } from '../../../utils/helpers/datetime';
import * as validator from '../../../utils/validators/event';
import * as helpers from '../../../utils/helpers/form';

import ServerError from '../../shared/Errors/ServerError/ServerError';
import ClientError from '../../shared/Errors/ClientError/ClientError';
import Input from '../../shared/Tags/Input/Input';
import FormButton from '../../shared/Buttons/Form/FormButton';

import styles from './FormEvent.module.css';

function FormEvent({ title, startTime, endTime, duration, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    //todo test events again

    const [values, setValues] = useState({
        title: title,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endTimeError, setEndTimeError] = useState('');

    const durationRef = useRef();
    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    useEffect(() => {
        if (values.startTime && values.endTime) {
            const [hours, minutes] = getDifference(values.startTime, values.endTime);

            durationRef.current.value = `${hours}:${minutes}`;
            values.duration = `${hours}:${minutes}`;
        }

        checkDisabled();
    }, [values, titleError, startTimeError, endTimeError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateTitle = () => {
        setTitleError(validator.validTitle(values.title));
    };

    const validateStartTime = () => {
        setStartTimeError(validator.validTime(values.startTime, values.endTime));
    };

    const validateEndTime = () => {
        setEndTimeError(validator.validTime(values.startTime, values.endTime));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [titleError, startTimeError, endTimeError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setTitleError(validator.validTitle(values.title));
        setStartTimeError(validator.validTime(values.startTime, values.endTime));
        setEndTimeError(validator.validTime(values.startTime, values.endTime));

        if (titleError || startTimeError || endTimeError) {
            return;
        }

        onSubmitHandler(values.title, parseDate(values.startTime), parseDate(values.endTime), values.duration);
    }

    return (
        <div ref={formRef} className="form-wrapper-center">
            <form className={[styles["event-form"], "form-error-message-width"].join(' ')} onSubmit={onSubmitHelperHandler}>
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
                        name="startTime"
                        type="time"
                        label="Start Time"
                        value={values.startTime}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateStartTime}
                    />
                    {startTimeError && <ClientError error={startTimeError} />}
                </div>
                <div className="form-wrapper">
                    <Input
                        name="endTime"
                        type="time"
                        label="End Time"
                        value={values.endTime}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateEndTime}
                    />
                    {endTimeError && <ClientError error={endTimeError} />}
                </div>
                <div className="form-wrapper">
                    <label className="label" htmlFor="duration">Duration</label>
                    <input ref={durationRef} className="input" id="duration" name="duration" type="text" readOnly />
                </div>
                <FormButton
                    formName={formName}
                    isDisabled={isDisabled}
                    onCancelFormHandler={onCancelFormHandler}
                />
            </form>
        </div>
    );
}

export default FormEvent;