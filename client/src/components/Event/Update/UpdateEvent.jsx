import { useState, useEffect } from "react";

import * as eventsService from '../../../services/events';

import FormEvent from "../Form/FormEvent";

function UpdateEvent({ eventId, plannerId, onCancelFormHandler, loadEvents }) {
    const formName = 'Update';
    const [serverError, setServerError] = useState('');
    const [event, setEvent] = useState({});

    useEffect(() => {
        eventsService
            .getById(plannerId, eventId)
            .then((res) => setEvent(res))
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (title, startTime, endTime, duration) => {
        eventsService
            .update(eventId, title, startTime, endTime, duration)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
                loadEvents();
                window.scrollTo({ behavior: 'smooth', top: 0 });
            })
            .catch((err) => console.error(err));
    };

    if (!event.title || !event.startTime || !event.endTime || !event.duration) {
        return null;
    }

    return (
        <FormEvent
            title={event.title}
            startTime={event.startTime}
            endTime={event.endTime}
            duration={event.duration}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default UpdateEvent;