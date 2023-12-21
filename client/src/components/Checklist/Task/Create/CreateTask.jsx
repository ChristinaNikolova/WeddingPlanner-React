import { useState, useEffect } from "react";

import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";

import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function CreateTask({ plannerId, timespan, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [formCanceled, setFormCanceled] = useState(false);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, description) => {
    tasksService
      .create(plannerId, title, description, timespan)
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
    <FormTask
      title={""}
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
    </FormTask>
  );
}

export default CreateTask;
