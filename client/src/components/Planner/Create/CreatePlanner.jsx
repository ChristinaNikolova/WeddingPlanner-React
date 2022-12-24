import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as plannersService from '../../../services/planners';

import FormPlanner from '../Form/FormPlanner';

function CreatePlanner() {
    const formName = 'Create';
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

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

    const onCancelHandler = () => {
        navigate(`/plan`);
    }

    return (
        <FormPlanner
            formName={formName}
            description={''}
            date={''}
            budget={''}
            location={''}
            bride={''}
            groom={''}
            serverError={serverError}
            onSubmitHandler={submitHandler}
            onCancelHandler={onCancelHandler}
        />
    );
}

export default CreatePlanner;