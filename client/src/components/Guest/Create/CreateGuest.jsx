import { useState, useEffect } from 'react';

import * as guestsService from '../../../services/guests';
import { formNames } from '../../../utils/constants/global';

import AddButton from '../../shared/Buttons/Add/AddButton';
import FormGuest from '../Form/FormGuest';

function CreateGuest({ plannerId, isHidden, onCancelFormHandler, onShowFormHandler, loadGuests }) {
    const formName = formNames.CREATE;
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
            <AddButton
                classNames={['guest-form-icon']}
                text={'guest'}
                isEmptyString={true}
                onShowFormHandler={onShowFormHandler}
            />
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