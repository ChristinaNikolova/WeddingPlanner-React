import { useState, useEffect } from "react";

import * as notesService from '../../../services/notes';
import { formNames } from "../../../utils/constants/global";

import FormNote from "../Form/FormNote";

function UpdateNote({ noteId, plannerId, onCancelFormHandler, loadGuests }) {
    const formName = formNames.UPDATE;
    const [serverError, setServerError] = useState('');
    const [note, setNote] = useState({});

    useEffect(() => {
        notesService
            .getById(plannerId, noteId)
            .then((res) => setNote(res))
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (description) => {
        notesService
            .update(noteId, description)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
                loadGuests();
            })
            .catch((err) => console.error(err));
    };

    if (!note.description) {
        return null;
    }

    return (
        <FormNote
            description={note.description}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default UpdateNote;