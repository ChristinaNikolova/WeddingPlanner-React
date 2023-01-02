import { useState, useEffect } from 'react';

import * as costsService from '../../../services/costs';
import { formNames } from '../../../utils/constants/global';

import FormCost from '../Form/FormCost';

function UpdateCost({ plannerId, costId, loadCosts, onCancelFormHandler }) {
    const formName = formNames.UPDATE;
    const [serverError, setServerError] = useState('');
    const [cost, setCost] = useState({});

    useEffect(() => {
        costsService
            .getById(plannerId, costId)
            .then((res) => setCost(res))
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (e, title, price) => {
        costsService
            .update(costId, title, price)
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

    if (!cost.title || !cost.price) {
        return null;
    }

    return (
        <FormCost
            title={cost.title}
            price={cost.price}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default UpdateCost;