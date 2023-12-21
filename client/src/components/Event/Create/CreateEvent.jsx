import { useState, useEffect } from "react";

import * as eventsService from "../../../services/events";
import { formNames } from "../../../utils/constants/global";

import FormEvent from "../Form/FormEvent";
import FormButton from "../../shared/Buttons/Form/FormButton";

function CreateEvent({ plannerId, isHidden, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (title, startTime, endTime, duration) => {
    eventsService
      .create(plannerId, title, startTime, endTime, duration)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        finish();
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  return (
    <>
      {!isHidden && (
        <FormEvent
          title={""}
          startTime={""}
          endTime={""}
          duration={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelFormHandler}
          />
        </FormEvent>
      )}
    </>
  );
}

export default CreateEvent;
