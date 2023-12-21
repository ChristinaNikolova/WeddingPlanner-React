import { useState, useEffect } from "react";

import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";

import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function CreateTask({ plannerId, timespan, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, description) => {
    tasksService
      .create(plannerId, title, description, timespan)
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
    <FormTask
      title={""}
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
    </FormTask>
  );
}

export default CreateTask;
