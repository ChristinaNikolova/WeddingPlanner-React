import { useState, useEffect } from "react";

import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";

import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";

function UpdateCost({ plannerId, costId, onCancelFormHandler, finish }) {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState("");
  const [cost, setCost] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    costsService
      .getById(plannerId, costId)
      .then((res) => setCost(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, price) => {
    costsService
      .update(costId, title, price)
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

  if (!cost.title || !cost.price) {
    return null;
  }

  return (
    <FormCost
      title={cost.title}
      price={cost.price}
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
    </FormCost>
  );
}

export default UpdateCost;
