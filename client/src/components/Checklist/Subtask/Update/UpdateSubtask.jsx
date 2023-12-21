import { useState, useEffect } from "react";

import * as subtasksService from "../../../../services/subtask";
import { formNames } from "../../../../utils/constants/global";

import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function UpdateSubtask({ subtaskId, onCancelFormHelperHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [subtask, setSubtask] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    subtasksService
      .getById(subtaskId)
      .then((res) => setSubtask(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, description) => {
    subtasksService
      .update(subtaskId, description)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError("");
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  if (!subtask.description) {
    return null;
  }

  return (
    <FormSubtask
      description={subtask.description}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHelperHandler}
      />
    </FormSubtask>
  );
}

export default UpdateSubtask;
