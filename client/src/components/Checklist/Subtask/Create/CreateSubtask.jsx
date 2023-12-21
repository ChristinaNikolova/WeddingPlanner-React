import { useState, useEffect } from "react";

import * as subtasksService from "../../../../services/subtask";
import { formNames } from "../../../../utils/constants/global";

import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function CreateSubtask({ taskId, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [formCanceled, setFormCanceled] = useState(false);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, description) => {
    subtasksService
      .create(taskId, description)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setFormCanceled(true);
        setServerError("");
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setFormCanceled(false);
    setIsDisabled(!!disable);
  }

  const onCancelForm = (e) => {
    setFormCanceled(true);
    setServerError("");
    onCancelFormHandler(e);
  };

  return (
    <FormSubtask
      description={""}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
      formCanceled={formCanceled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelForm}
      />
    </FormSubtask>
  );
}

export default CreateSubtask;
