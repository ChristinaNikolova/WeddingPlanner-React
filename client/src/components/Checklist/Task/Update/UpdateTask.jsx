import { useState, useEffect } from "react";

import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";

import FormTask from "../Form/FormTask";

function UpdateTask({ plannerId, taskId, loadTasks, onCancelFormHandler }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [task, setTask] = useState({});

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

        onCancelFormHandler(e);
        loadTasks();
      })
      .catch((err) => console.error(err));
  };

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
      onCancelFormHandler={onCancelFormHandler}
    />
  );
}

export default UpdateTask;
