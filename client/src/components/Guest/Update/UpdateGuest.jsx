import { useState, useEffect } from "react";

import * as guestsService from "../../../services/guests";
import { formNames } from "../../../utils/constants/global";

import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";

function UpdateGuest({ guestId, plannerId, onCancelFormHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [guest, setGuest] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    guestsService
      .getById(plannerId, guestId)
      .then((res) => setGuest(res))
      .catch((err) => console.error(err));
  }, []);

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
      .update(
        guestId,
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

        finish();
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable) {
    setIsDisabled(!!disable);
  }

  if (
    !guest.firstName ||
    !guest.lastName ||
    !guest.gender ||
    !guest.age ||
    !guest.side ||
    !guest.role ||
    !guest.mainDish
  ) {
    return null;
  }

  return (
    <FormGuest
      firstName={guest.firstName}
      lastName={guest.lastName}
      gender={guest.gender}
      age={guest.age}
      side={guest.side}
      role={guest.role}
      table={guest.table}
      mainDish={guest.mainDish}
      confirmed={guest.confirmed}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormGuest>
  );
}

export default UpdateGuest;
