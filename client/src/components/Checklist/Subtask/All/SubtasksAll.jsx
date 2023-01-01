import { useState } from 'react';

import * as subtasksService from '../../../../services/subtask';

import CreateSubtask from '../Create/CreateSubtask';
import SingleSubtask from '../Single/SingleSubtask';
import UpdateSubtask from '../Update/UpdateSubtask';

import styles from './SubtasksAll.module.css';

function SubtasksAll({ taskId, subtasks, loadTasks, onCancelFormHandler }) {
    const [subtaskId, setSubtaskId] = useState('');

    const onShowSubTaskFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.parentElement.parentElement.children[1].children[0];
        targetFormElement.style.display = 'flex';
    }

    const onDoneSubtask = (taskId, subtaskId) => {
        subtasksService
            .done(taskId, subtaskId)
            .then(() => {
                loadTasks();
            })
            .catch((err) => console.error(err));
    }

    const onEditHandler = (id) => {
        setSubtaskId(id);
    }

    const onDeleteHandler = (taskId, subtaskId) => {
        subtasksService
            .deleteById(taskId, subtaskId)
            .then(() => {
                loadTasks();
            })
            .catch((err) => console.error(err));
    }

    const onCancelFormHelperHandler = () => {
        setSubtaskId('');
    }

    return (
        <div className={styles["checklist-all-current-task-subtasks-wrapper"]}>
            <h6 className={styles["checklist-all-current-task-subtasks-title"]}>Sub-tasks</h6>
            <div className={styles["checklist-all-current-task-subtasks-form-wrapper"]}>

                {subtaskId
                    ? <UpdateSubtask
                        subtaskId={subtaskId}
                        loadTasks={loadTasks}
                        onCancelFormHelperHandler={onCancelFormHelperHandler}
                    />
                    : <CreateSubtask
                        taskId={taskId}
                        loadTasks={loadTasks}
                        onCancelFormHandler={onCancelFormHandler}
                    />
                }
            </div>
            {subtasks.length > 0
                ? subtasks.map((st) =>
                    <SingleSubtask
                        key={st.id}
                        taskId={taskId}
                        subtaskId={subtaskId}
                        id={st.id}
                        description={st.description}
                        isDone={st.isDone}
                        onDoneSubtask={onDoneSubtask}
                        onEditHandler={onEditHandler}
                        onDeleteHandler={onDeleteHandler}
                    />
                )
                : <p className={styles["checklist-all-empty-subtasks"]}>No sub-tasks yet</p>
            }
            <div className={styles["checklist-all-current-task-subtasks-form-icon-wrapper"]}>
                {!subtaskId
                    && <div className="form-icon-wrapper">
                        <i onClick={onShowSubTaskFormHandler} className="fa-solid fa-plus"></i>
                        Add sub-task
                    </div>
                }
            </div>
        </div>
    );
}

export default SubtasksAll;