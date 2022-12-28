import { useState, useEffect } from 'react';

import * as notesService from '../../../services/notes';

import FormNote from '../Form/FormNote';

import styles from './CreateNote.module.css';

function CreateNote({ plannerId, isHidden, onCancelFormHandler, onShowFormHandler, loadNotes }) {
    const formName = 'Create';
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (description) => {
        notesService
            .create(plannerId, description)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
                loadNotes();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className={[styles["note-form-icon"], "form-icon-wrapper"].join(' ')}>
                <i onClick={() => onShowFormHandler('')} className="fa-solid fa-plus"></i>
                Add note
            </div>
            {!isHidden &&
                <FormNote
                    description={''}
                    formName={formName}
                    serverError={serverError}
                    onSubmitHandler={onSubmitHandler}
                    onCancelFormHandler={onCancelFormHandler}
                />
            }
        </>
    );
}

export default CreateNote;