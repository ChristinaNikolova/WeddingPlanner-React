import { useState, useEffect } from 'react';

import * as subtasksService from '../../../../services/subtask';
import { formNames } from '../../../../utils/constants/global';

import FormSubtask from '../Form/FormSubtask';

function CreateSubtask({ taskId, loadTasks, onCancelFormHandler }) {
    const formName = formNames.CREATE;
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (e, description) => {
        subtasksService
            .create(taskId, description)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHandler(e);
                loadTasks();
            })
            .catch((err) => console.error(err));
    };

    return (
        <FormSubtask
            description={''}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default CreateSubtask;