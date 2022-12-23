import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as plannersService from '../../../services/planners';

import FormPlanner from "../Form/FormPlanner";

function UpdatePlanner() {
    const formName = 'Update';
    const navigate = useNavigate();
    const { id } = useParams();

    const [planner, setPlanner] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        plannersService
            .getById(id)
            .then((data) => setPlanner(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
    }, [serverError]);

    const submitHandler = (description, date, budget, location, bride, groom) => {
        plannersService
            .update(id, description, date, budget, location, bride, planner.brideId, groom, planner.groomId)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelHandler();
            })
            .catch((err) => console.error(err));
    };

    const onCancelHandler = () => {
        navigate(`/plan/${id}`);
    }

    if (!planner.description || !planner.date || !planner.budget || !planner.location || !planner.bride || !planner.groom) {
        return null;
    }

    return (
        <FormPlanner
            formName={formName}
            description={planner.description}
            date={planner.date}
            budget={planner.budget}
            location={planner.location}
            bride={planner.bride}
            groom={planner.groom}
            serverError={serverError}
            onSubmitHandler={submitHandler}
            onCancelHandler={onCancelHandler}
        />
    );
}

export default UpdatePlanner;