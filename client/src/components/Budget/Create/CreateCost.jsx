import { useState, useEffect } from "react";

import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";

import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";

function CreateCost({ plannerId, category, onCancelFormHandler, finish }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [formCanceled, setFormCanceled] = useState(false);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, price) => {
    costsService
      .create(plannerId, title, price, category)
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
    <FormCost
      title={""}
      price={""}
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
    </FormCost>
  );
}

export default CreateCost;
