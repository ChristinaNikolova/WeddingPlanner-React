import { useState, useEffect } from "react";

import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";

import FormCost from "../Form/FormCost";

function CreateCost({ plannerId, category, loadCosts, onCancelFormHandler }) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState("");

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (e, title, price) => {
    costsService
      .create(plannerId, title, price, category)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        onCancelFormHandler(e);
        loadCosts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <FormCost
      title={""}
      price={""}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
}

export default CreateCost;
