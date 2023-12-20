import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as plannersService from "../../../services/planners";
import { formNames } from "../../../utils/constants/global";

import FormPlanner from "../Form/FormPlanner";

function CreatePlanner() {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  useEffect(() => {}, [serverError]);

  const submitHandler = (description, date, budget, location, bride, groom) => {
    plannersService
      .create(description, date, budget, location, bride, groom)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        navigate(`/plan/${data._id}`);
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = () => {
    navigate(`/plan`);
  };

  return (
    <FormPlanner
      formName={formName}
      description={""}
      date={""}
      budget={""}
      location={""}
      bride={""}
      groom={""}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
}

export default CreatePlanner;
