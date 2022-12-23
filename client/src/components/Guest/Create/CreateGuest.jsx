import { useState, useEffect } from 'react';

import * as guestsService from '../../../services/guests';

import FormGuest from '../Form/FormGuest';

import styles from './CreateGuest.module.css';

function CreateGuest({ plannerId, loadGuests }) {
    const formName = 'Create';
    const [serverError, setServerError] = useState('');
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
    }, [serverError]);

    const onCancelHandler = () => {
        setIsHidden(true);
    }

    const onShowFormHandler = () => {
        setIsHidden(!isHidden);
    }

    const onSubmitHandler = (firstName, lastName, gender, age, side, role, table, mainDish, confirmed) => {
        guestsService.create(plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelHandler();
                loadGuests();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className={styles["guest-form-icon"]}>
                <i onClick={onShowFormHandler} className="fa-solid fa-plus"></i>
                Add guest
            </div>
            {!isHidden &&
                <FormGuest
                    formName={formName}
                    onSubmitHandler={onSubmitHandler}
                    onCancelHandler={onCancelHandler}
                />
            }
        </>
    );
}

export default CreateGuest;