import { useState, useEffect } from "react";

import * as notesService from "../../../services/notes";
import { formNames } from "../../../utils/constants/global";

import FormNote from "../Form/FormNote";
import FormButton from "../../shared/Buttons/Form/FormButton";

function UpdateNote({ noteId, plannerId, onCancelFormHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [note, setNote] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    notesService
      .getById(plannerId, noteId)
      .then((res) => setNote(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (description) => {
    notesService
      .update(noteId, description)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError("");
        finish();
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  if (!note.description) {
    return null;
  }

  return (
    <FormNote
      description={note.description}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormNote>
  );
}

export default UpdateNote;
