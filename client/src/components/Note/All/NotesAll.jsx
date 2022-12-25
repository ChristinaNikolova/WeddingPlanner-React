import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as notesService from '../../../services/notes';

import SingleNote from '../Single/SingleNote';
import CreateNote from '../Create/CreateNote';

import styles from './NotesAll.module.css';

function NotesAll() {
    //todo calculate on details planner
    //todo test server errors -> create and update
    //todo test cancel button
    //todo btns wrapper extract

    const { id: plannerId } = useParams();
    const [notes, setNotes] = useState([]);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        loadNotes();
    }, []);


    const onShowFormHandler = () => {
        setIsHidden(!isHidden);
    }

    const onCancelFormHandler = () => {
        setIsHidden(true);
    }

    const loadNotes = () => {
        notesService
            .all(plannerId)
            .then((res) => setNotes(res))
            .catch((err) => console.error(err));
    }

    const onDeleteHandler = (id) => {
        notesService
            .deleteById(id)
            .then(() => {
                loadNotes();
            })
            .catch((err) => console.error(err));
    }

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
                            onDeleteHandler={onDeleteHandler}
                        />)
                    : <p className={[styles["notes-all-empty"], "empty"].join(' ')}>No notes yet</p>
                }
            </div>
            <CreateNote
                plannerId={plannerId}
                isHidden={isHidden}
                onCancelFormHandler={onCancelFormHandler}
                onShowFormHandler={onShowFormHandler}
                loadNotes={loadNotes}
            />
        </section>
    );
}

export default NotesAll;