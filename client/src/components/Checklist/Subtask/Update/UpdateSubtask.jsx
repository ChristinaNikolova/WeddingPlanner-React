import { useState, useEffect } from 'react';

import * as subtasksService from '../../../../services/subtask';
import { formNames } from '../../../../utils/constants/global';

import FormSubtask from '../Form/FormSubtask';

function UpdateSubtask({ subtaskId, loadTasks, onCancelFormHelperHandler }) {
    //todo hide add new sb task button
    const formName = formNames.UPDATE;
    const [serverError, setServerError] = useState('');
    const [subtask, setSubtask] = useState({});

    useEffect(() => {
        subtasksService
            .getById(subtaskId)
            .then((res) => setSubtask(res))
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (e, description) => {
        subtasksService
            .update(subtaskId, description)
            .then((data) => {
                if (data.message) {
                    setServerError(data.message);
                    return;
                }

                onCancelFormHelperHandler(e);
                loadTasks();
            })
            .catch((err) => console.error(err));
    };

    if (!subtask.description) {
        return null;
    }

    return (
        <FormSubtask
            description={subtask.description}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHelperHandler}
        />
    );
}

export default UpdateSubtask;