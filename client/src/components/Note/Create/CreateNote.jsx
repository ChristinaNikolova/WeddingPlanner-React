import { useState, useEffect } from "react";

import * as notesService from "../../../services/notes";
import { formNames } from "../../../utils/constants/global";

import FormNote from "../Form/FormNote";
import FormButton from "../../shared/Buttons/Form/FormButton";

function CreateNote({ plannerId, isHidden, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (description) => {
    notesService
      .create(plannerId, description)
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

  function onCancelForm() {
    setServerError("");
    onCancelFormHandler();
  }

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  return (
    <>
      {!isHidden && (
        <FormNote
          description={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelForm}
          />
        </FormNote>
      )}
    </>
  );
}

export default CreateNote;
