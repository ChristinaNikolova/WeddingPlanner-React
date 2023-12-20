import { useState, useEffect, useRef } from "react";

import * as validator from "../../../utils/validators/note";
import * as helpers from "../../../utils/helpers/form";

import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import TextArea from "../../shared/Tags/TextArea/TextArea";

function FormNote({
  description,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}) {
  const [values, setValues] = useState({
    description: description,
  });
  const [descriptionError, setDescriptionError] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
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

    onSubmitHandler(values.description);
  };

  return (
    <div ref={formRef} className="form-wrapper-center">
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <TextArea
            name="description"
            label="Note"
            value={values.description}
            rows="10"
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

export default FormNote;
