import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as notesService from '../../../services/notes';
import * as validator from '../../../utils/validators/note';
import * as helpers from '../../../utils/helpers/form';

import ClientError from '../../shared/Errors/ClientError/ClientError';
import ServerError from '../../shared/Errors/ServerError/ServerError';
import TextArea from '../../shared/Tags/TextArea/TextArea';
import SingleNote from '../Single/SingleNote';

import styles from './NotesAll.module.css';

function NotesAll() {
    const formName = 'Create';
    //todo calculate on details planner
    //todo test server errors -> create and update
    //todo test cancel button

    const { id: plannerId } = useParams();
    const [notes, setNotes] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [values, setValues] = useState({
        description: ''
    });
    const [descriptionError, setDescriptionError] = useState('');
    const [serverError, setServerError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        notesService
            .all(plannerId)
            .then((res) => setNotes(res))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        checkDisabled();
    }, [values, descriptionError]);

    const onShowFormHandler = () => {
        setIsHidden(!isHidden);
    }

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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        setDescriptionError(validator.validDescription(values.description));

        if (descriptionError) {
            return;
        }

        notesService
            .create(plannerId, values.description)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

    console.log(notes);

    return (
        <section className={styles["notes-all"]}>
            <div className="section-title-wrapper">
                <h2 className="section-title">Notes</h2>
            </div>
            <div className={styles["notes-all-main-content-wrapper"]}>
                {notes.length
                    ? notes.map((n) =>
                        <SingleNote
                            key={n.id}
                            id={n.id}
                            description={n.description}
                            createdAt={n.createdAt}
                        />)
                    : <p className={[styles["notes-all-empty"], "empty"].join(' ')}>No notes yet</p>
                }
            </div>
            <>
                <div className={styles["note-form-icon"]}>
                    <i onClick={() => onShowFormHandler('')} className="fa-solid fa-plus"></i>
                    Add note
                </div>
                {!isHidden &&
                    <div className={styles["note-content-form-wrapper"]} >
                        <form className={[styles["note-form"], "form-error-message-width", "form-custom-width"].join(' ')} onSubmit={onSubmitHandler}>
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
                                {/* <button onClick={onCancelFormHandler} className="btn btn-center">Cancel</button> */}
                            </div>
                        </form>
                    </div>
                }
            </>
        </section>
    );
}

export default NotesAll;