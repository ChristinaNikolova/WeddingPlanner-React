import { useState, useEffect } from "react";

import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";

import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";

function UpdateTask({ plannerId, taskId, onCancelFormHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [task, setTask] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    tasksService
      .getById(plannerId, taskId)
      .then((res) => setTask(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, description) => {
    tasksService
      .update(taskId, title, description)
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

  if (!task.title || !task.description) {
    return null;
  }

  return (
    <FormTask
      title={task.title}
      description={task.description}
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

export default UpdateTask;
