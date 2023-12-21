import { useState, useEffect, useRef } from "react";

import * as global from "../../../utils/constants/global";
import * as helpers from "../../../utils/helpers/form";
import * as validator from "../../../utils/validators/guest";

import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import Input from "../../shared/Tags/Input/Input";
import Select from "../../shared/Tags/Select/Select";

import styles from "./FormGuest.module.css";

function FormGuest({
  firstName,
  lastName,
  gender,
  age,
  side,
  role,
  table,
  mainDish,
  confirmed,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}) {
  const [values, setValues] = useState({
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    age: age,
    side: side,
    role: role,
    table: table,
    mainDish: mainDish,
    confirmed: confirmed ? "yes" : "no",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [values, firstNameError, lastNameError]);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFirstName = () => {
    setFirstNameError(validator.validName(values.firstName));
  };

  const validateLastName = () => {
    setLastNameError(validator.validName(values.lastName));
  };

  const checkDisabled = () => {
    const valuesToCheck = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const isDisabled = helpers.isButtonDisabled(valuesToCheck, [
      firstNameError,
      lastNameError,
    ]);
    checkIsDisabled(isDisabled);
  };

  const onSubmitHelperHandler = (e) => {
    e.preventDefault();

    setFirstNameError(validator.validName(values.firstName));
    setLastNameError(validator.validName(values.lastName));

    if (firstNameError || lastNameError) {
      return;
    }

    onSubmitHandler(
      values.firstName,
      values.lastName,
      values.gender,
      values.age,
      values.side,
      values.role,
      values.table,
      values.mainDish,
      values.confirmed
    );
  };

  return (
    <div ref={formRef} className="form-wrapper-center">
      <form
        onSubmit={onSubmitHelperHandler}
        className={[styles["guest-form"], "form-error-message-width"].join(" ")}
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <Input
            name="firstName"
            type="text"
            label="First Name"
            value={values.firstName}
            onChangeHandler={changeHandler}
            onBlurHandler={validateFirstName}
          />
          {firstNameError && <ClientError error={firstNameError} />}
        </div>
        <div className="form-wrapper">
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            value={values.lastName}
            onChangeHandler={changeHandler}
            onBlurHandler={validateLastName}
          />
          {lastNameError && <ClientError error={lastNameError} />}
        </div>
        <div className="form-wrapper">
          <label className="label">Gender:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="gender"
                type="radio"
                label="Male"
                value="male"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.gender === "male"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="gender"
                type="radio"
                label="Female"
                value="female"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.gender === "female"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Age:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Adult"
                value="adult"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.age === "adult"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Child"
                value="child"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.age === "child"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Baby"
                value="baby"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.age === "baby"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Side:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="side"
                type="radio"
                label="Bride"
                value="bride"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.side === "bride"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="side"
                type="radio"
                label="Groom"
                value="groom"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.side === "groom"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <Select
            name="role"
            label="Role"
            value={values.role}
            onChangeHandler={changeHandler}
            onBlurHandler={null}
            categories={global.roles}
          />
        </div>
        <div className="form-wrapper">
          <Input
            name="table"
            type="text"
            label="Table"
            value={values.table}
            onChangeHandler={changeHandler}
            onBlurHandler={null}
          />
        </div>
        <div className="form-wrapper">
          <label className="label">Main dish:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="No info"
                value="no info"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.mainDish === "no info"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Meat"
                value="meat"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.mainDish === "meat"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Fish"
                value="fish"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.mainDish === "fish"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Veggies"
                value="veggies"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.mainDish === "veggies"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Confirmed:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="confirmed"
                type="radio"
                label="Yes"
                value="yes"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.confirmed === "yes"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="confirmed"
                type="radio"
                label="No"
                value="no"
                onChangeHandler={changeHandler}
                onBlurHandler={null}
                checked={values.confirmed === "no"}
              />
            </div>
          </div>
        </div>
        {children}
      </form>
    </div>
  );
}

export default FormGuest;
