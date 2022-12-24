import { useState, useEffect } from 'react';

import * as guestsService from '../../../services/guests';

import FormGuest from '../Form/FormGuest';

import styles from './CreateGuest.module.css';

function CreateGuest({ plannerId, isHidden, onCancelFormHandler, onShowFormHandler, loadGuests }) {
    const formName = 'Create';
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (firstName, lastName, gender, age, side, role, table, mainDish, confirmed) => {
        guestsService.create(plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler();
                loadGuests();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className={styles["guest-form-icon"]}>
                <i onClick={() => onShowFormHandler('')} className="fa-solid fa-plus"></i>
                Add guest
            </div>
            {!isHidden &&
                <FormGuest
                    firstName={''}
                    lastName={''}
                    gender={'male'}
                    age={'adult'}
                    side={'bride'}
                    role={'bride'}
                    table={''}
                    mainDish={'no info'}
                    confirmed={''}
                    formName={formName}
                    serverError={serverError}
                    onSubmitHandler={onSubmitHandler}
                    onCancelFormHandler={onCancelFormHandler}
                />
            }
        </>
    );
}

export default CreateGuest;