import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as notesService from "../../../services/notes";
import { scrollToTop } from "../../../utils/helpers/form";
import { addButtonTexts } from "../../../utils/constants/global";

import SingleNote from "../Single/SingleNote";
import CreateNote from "../Create/CreateNote";
import UpdateNote from "../Update/UpdateNote";
import AddButton from "../../shared/Buttons/Add/AddButton";

import styles from "./NotesAll.module.css";

function NotesAll() {
  const { id: plannerId } = useParams();
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isEditIconHidden, setIsEditIconHidden] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const onShowFormHandler = (noteId) => {
    setIsHidden(!isHidden);
    noteId ? setNoteId(noteId) : setNoteId("");
    setIsEditIconHidden(!isEditIconHidden);
  };

  const onCancelFormHandler = () => {
    setIsHidden(true);
    setNoteId("");
    setIsEditIconHidden(false);
  };

  const onDeleteHandler = (id) => {
    notesService
      .deleteById(id)
      .then(() => {
        loadNotes();
      })
      .catch((err) => console.error(err));
  };

  const loadNotes = () => {
    notesService
      .all(plannerId)
      .then((res) => {
        setNotes(res);
        scrollToTop();
      })
      .catch((err) => console.error(err));
  };

  const finish = () => {
    onCancelFormHandler();
    loadNotes();
  };

  return (
    <section
      id={styles["notes-all"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">Notes</h2>
      </div>
      <div className={styles["notes-all-main-content-wrapper"]}>
        {notes.length ? (
          notes.map((n) => (
            <SingleNote
              key={n.id}
              id={n.id}
              description={n.description}
              createdAt={n.createdAt}
              isEditIconHidden={isEditIconHidden}
              onDeleteHandler={onDeleteHandler}
              onShowFormHandler={onShowFormHandler}
            />
          ))
        ) : (
          <p className="empty empty-planner">No notes yet</p>
        )}
      </div>
      {noteId ? (
        <UpdateNote
          noteId={noteId}
          plannerId={plannerId}
          onCancelFormHandler={onCancelFormHandler}
          finish={finish}
        />
      ) : (
        <>
          <AddButton
            classNames={["note-form-icon"]}
            text={addButtonTexts.NOTE}
            isEmptyString={true}
            onShowFormHandler={onShowFormHandler}
          />
          <CreateNote
            plannerId={plannerId}
            isHidden={isHidden}
            onCancelFormHandler={onCancelFormHandler}
            finish={finish}
          />
        </>
      )}
    </section>
  );
}

export default NotesAll;
