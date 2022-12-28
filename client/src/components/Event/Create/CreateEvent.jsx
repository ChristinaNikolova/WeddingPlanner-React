import { useState, useEffect } from 'react';

import * as eventsService from '../../../services/events';

import FormEvent from '../Form/FormEvent';

import styles from './CreateEvent.module.css';

function CreateEvent({ plannerId, isHidden, onCancelFormHandler, onShowFormHandler, loadEvents }) {
    const formName = 'Create';
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (title, startTime, endTime, duration) => {
        eventsService
            .create(plannerId, title, startTime, endTime, duration)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
                loadEvents();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className={[styles["event-form-icon"], "form-icon-wrapper"].join(' ')}>
                <i onClick={() => onShowFormHandler('')} className="fa-solid fa-plus"></i>
                Add Event
            </div>
            {!isHidden &&
                <FormEvent
                    title={''}
                    startTime={''}
                    endTime={''}
                    duration={''}
                    formName={formName}
                    serverError={serverError}
                    onSubmitHandler={onSubmitHandler}
                    onCancelFormHandler={onCancelFormHandler}
                />
            }
        </>
    );
}

export default CreateEvent;