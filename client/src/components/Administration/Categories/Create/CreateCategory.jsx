import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as categoriesService from "../../../../services/categories";
import { formNames } from "../../../../utils/constants/global";

import FormCategory from "../Form/FormCategory";

function CreateCategory() {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  useEffect(() => {}, [serverError]);

  const submitHandler = (name, image) => {
    categoriesService
      .create(name, image)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        navigate("/administration/categories");
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = () => {
    navigate("/administration/categories");
  };

  return (
    <FormCategory
      formName={formName}
      name={""}
      image={""}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
}

export default CreateCategory;
