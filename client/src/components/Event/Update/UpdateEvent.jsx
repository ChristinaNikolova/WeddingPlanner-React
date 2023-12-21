import { useState, useEffect } from "react";

import * as eventsService from "../../../services/events";
import { formNames } from "../../../utils/constants/global";

import FormEvent from "../Form/FormEvent";
import FormButton from "../../shared/Buttons/Form/FormButton";

function UpdateEvent({ eventId, plannerId, onCancelFormHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [event, setEvent] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    eventsService
      .getById(plannerId, eventId)
      .then((res) => setEvent(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (title, startTime, endTime, duration) => {
    eventsService
      .update(eventId, title, startTime, endTime, duration)
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

  if (!event.title || !event.startTime || !event.endTime || !event.duration) {
    return null;
  }

  return (
    <FormEvent
      title={event.title}
      startTime={event.startTime}
      endTime={event.endTime}
      duration={event.duration}
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
  );
}

export default UpdateEvent;
