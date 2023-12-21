import { useState, useEffect } from "react";

import * as guestsService from "../../../services/guests";
import { formNames } from "../../../utils/constants/global";

import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";

function CreateGuest({ plannerId, isHidden, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    firstName,
    lastName,
    gender,
    age,
    side,
    role,
    table,
    mainDish,
    confirmed
  ) => {
    guestsService
      .create(
        plannerId,
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed
      )
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError("");
        finish();
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  function onCancelForm() {
    setServerError("");
    onCancelFormHandler();
  }

  return (
    <>
      {!isHidden && (
        <FormGuest
          firstName={""}
          lastName={""}
          gender={"male"}
          age={"adult"}
          side={"bride"}
          role={"bride"}
          table={""}
          mainDish={"no info"}
          confirmed={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelForm}
          />
        </FormGuest>
      )}
    </>
  );
}

export default CreateGuest;
