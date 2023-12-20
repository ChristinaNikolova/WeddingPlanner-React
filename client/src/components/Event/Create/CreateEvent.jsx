import { useState, useEffect } from "react";

import * as eventsService from "../../../services/events";
import { addButtonTexts, formNames } from "../../../utils/constants/global";

import AddButton from "../../shared/Buttons/Add/AddButton";
import FormEvent from "../Form/FormEvent";

function CreateEvent({
  plannerId,
  isHidden,
  onCancelFormHandler,
  onShowFormHandler,
  loadEvents,
}) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (title, startTime, endTime, duration) => {
    eventsService
      .create(plannerId, title, startTime, endTime, duration)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        onCancelFormHandler();
        loadEvents();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AddButton
        classNames={["event-form-icon"]}
        text={addButtonTexts.EVENT}
        isEmptyString={true}
        onShowFormHandler={onShowFormHandler}
      />
      {!isHidden && (
        <FormEvent
          title={""}
          startTime={""}
          endTime={""}
          duration={""}
          formName={formName}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          onCancelFormHandler={onCancelFormHandler}
        />
      )}
    </>
  );
}

export default CreateEvent;
