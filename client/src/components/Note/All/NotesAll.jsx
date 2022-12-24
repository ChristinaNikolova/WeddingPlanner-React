import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as notesService from '../../../services/notes';

import SingleNote from '../Single/SingleNote';

import styles from './NotesAll.module.css';

function NotesAll() {
    //todo calculate on details planner
    const { id: plannerId } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        notesService
            .all(plannerId)
            .then((res) => setNotes(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(notes);

    return (
        <section className={styles["notes-all"]}>
            <div className="section-title-wrapper">
                <h2 className="section-title">Notes</h2>
            </div>
            <div className={styles["notes-all-main-content-wrapper"]}>
                {notes.length
                    ? notes.map((n) => <SingleNote />)
                    : <span>No notes yet</span>
                }
            </div>
            {/* create */}
        </section>
    );
}

export default NotesAll;