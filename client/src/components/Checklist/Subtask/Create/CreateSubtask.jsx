import { useState, useEffect } from "react";

import * as subtasksService from "../../../../services/subtask";
import { formNames } from "../../../../utils/constants/global";

import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function CreateSubtask({ taskId, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, description) => {
    subtasksService
      .create(taskId, description)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        finish(e);
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  return (
    <FormSubtask
      description={""}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormSubtask>
  );
}

export default CreateSubtask;
