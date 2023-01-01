import { useState, useEffect } from 'react';

import * as notesService from '../../../services/notes';
import { formNames } from '../../../utils/constants/global';

import AddButton from '../../shared/Buttons/Add/AddButton';
import FormNote from '../Form/FormNote';

function CreateNote({ plannerId, isHidden, onCancelFormHandler, onShowFormHandler, loadNotes }) {
    const formName = formNames.CREATE;
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
            <AddButton
                classNames={['note-form-icon']}
                text={'note'}
                isEmptyString={true}
                onShowFormHandler={onShowFormHandler}
            />
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