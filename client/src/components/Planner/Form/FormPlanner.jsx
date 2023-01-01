import { useState, useEffect } from 'react';

import * as validator from '../../../utils/validators/planner';
import * as helpers from '../../../utils/helpers/form';

import ClientError from '../../shared/Errors/ClientError/ClientError';
import ServerError from '../../shared/Errors/ServerError/ServerError';
import Input from '../../shared/Tags/Input/Input';
import TextArea from '../../shared/Tags/TextArea/TextArea';
import FormButton from '../../shared/Buttons/Form/FormButton';

function FormPlanner({
    formName,
    description,
    date,
    budget,
    location,
    bride,
    groom,
    serverError,
    onSubmitHandler,
    onCancelFormHandler
}) {
    const [values, setValues] = useState({
        description: description,
        date: date,
        budget: budget,
        location: location,
        bride: bride,
        groom: groom,
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [descriptionError, setDescriptionError] = useState('');
    const [dateError, setDateError] = useState('');
    const [budgetError, setBudgetError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [brideError, setBrideError] = useState('');
    const [groomError, setGroomError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, descriptionError, dateError, budgetError, locationError, brideError, groomError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const validateDescription = () => {
        setDescriptionError(validator.validDescription(values.description));
    }

    const validateDate = () => {
        setDateError(validator.validDate(values.date));
    }

    const validateBudget = () => {
        setBudgetError(validator.validBudget(values.budget));
    }

    const validateLocation = () => {
        setLocationError(validator.validLocation(values.location));
    }

    const validateBride = () => {
        setBrideError(validator.validName(values.bride));
    }

    const validateGroom = () => {
        setGroomError(validator.validName(values.groom));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [descriptionError, dateError, budgetError, locationError, brideError, groomError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setDescriptionError(validator.validDescription(values.description));
        setDateError(validator.validDate(values.date));
        setBudgetError(validator.validBudget(values.budget));
        setLocationError(validator.validLocation(values.location));
        setBrideError(validator.validName(values.bride));
        setGroomError(validator.validName(values.groom));

        if (descriptionError || dateError || budgetError || locationError || brideError || groomError) {
            return;
        }

        onSubmitHandler(values.description, values.date, values.budget, values.location, values.bride, values.groom);
    }

    return (
        <section className="section section-background">
            {serverError && <ServerError errors={serverError} />}
            <div className="section-title-wrapper">
                <h2 className="section-title">{formName} Planner</h2>
            </div>
            <div className="form-wrapper-center">
                <form className="form-width" onSubmit={onSubmitHelperHandler}>
                    <div className="form-wrapper">
                        <TextArea
                            name="description"
                            label="Description"
                            value={values.description}
                            rows="8"
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateDescription}
                        />
                        {descriptionError && <ClientError error={descriptionError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="date"
                            type="text"
                            label="Date"
                            value={values.date}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateDate}
                        />
                        {dateError && <ClientError error={dateError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="budget"
                            type="number"
                            label="Budget"
                            value={values.budget}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateBudget}
                        />
                        {budgetError && <ClientError error={budgetError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="location"
                            type="text"
                            label="Location"
                            value={values.location}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateLocation}
                        />
                        {locationError && <ClientError error={locationError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="bride"
                            type="text"
                            label="Bride"
                            value={values.bride}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateBride}
                        />
                        {brideError && <ClientError error={brideError} />}
                    </div>
                    <div className="form-wrapper">
                        <Input
                            name="groom"
                            type="text"
                            label="Groom"
                            value={values.groom}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateGroom}
                        />
                        {groomError && <ClientError error={groomError} />}
                    </div>
                    <FormButton
                        formName={formName}
                        isDisabled={isDisabled}
                        onCancelFormHandler={onCancelFormHandler}
                    />
                </form>
            </div>
        </section>
    );
}

export default FormPlanner;
