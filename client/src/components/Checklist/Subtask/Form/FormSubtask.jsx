import { useState, useEffect } from "react";

import * as validator from "../../../../utils/validators/subtask";
import * as helpers from "../../../../utils/helpers/form";
import { formNames, styleNames } from "../../../../utils/constants/global";

import ClientError from "../../../shared/Errors/ClientError/ClientError";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import TextArea from "../../../shared/Tags/TextArea/TextArea";

function FormSubtask({
  description,
  formName,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
  formCanceled,
}) {
  const [values, setValues] = useState({
    description: description,
  });

  const [descriptionError, setDescriptionError] = useState("");
  const [currentStyle, setCurrentStyle] = useState(styleNames.NONE);

  useEffect(() => {
    if (formName !== formNames.UPDATE) {
      setValues({
        description: "",
      });
      setDescriptionError("");
    }
  }, [formCanceled]);

  useEffect(() => {
    if (formName === formNames.UPDATE) {
      setCurrentStyle(styleNames.FLEX);
    }
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [values, descriptionError]);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDescription = () => {
    setDescriptionError(validator.validDescription(values.description));
  };

  const checkDisabled = () => {
    const isDisabled = helpers.isButtonDisabled(values, [descriptionError]);
    checkIsDisabled(isDisabled);
  };

  const onSubmitHelperHandler = (e) => {
    e.preventDefault();

    setDescriptionError(validator.validDescription(values.description));

    if (descriptionError) {
      return;
    }

    onSubmitHandler(e, values.description);
  };

  return (
    <div className="form-wrapper-center" style={{ display: currentStyle }}>
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <TextArea
            name="description"
            label="Description"
            value={values.description}
            rows={4}
            onChangeHandler={changeHandler}
            onBlurHandler={validateDescription}
          />
          {descriptionError && <ClientError error={descriptionError} />}
        </div>
        {children}
      </form>
    </div>
  );
}

export default FormSubtask;
