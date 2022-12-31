import { useState, useEffect } from 'react';

import * as tasksService from '../../../services/tasks';

import FormTask from '../Form/FormTask';

function CreateTask({ plannerId, timespan, loadTasks, onCancelFormHandler }) {
    const formName = 'Create';
    const [serverError, setServerError] = useState('');

    useEffect(() => {
    }, [serverError]);

    const onSubmitHandler = (e, title, description) => {
        tasksService
            .create(plannerId, title, description, timespan)
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
        <FormTask
            title={''}
            description={''}
            formName={formName}
            serverError={serverError}
            onSubmitHandler={onSubmitHandler}
            onCancelFormHandler={onCancelFormHandler}
        />
    );
}

export default CreateTask;