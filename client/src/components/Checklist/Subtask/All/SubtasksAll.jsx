import * as subtasksService from '../../../../services/subtask';

import CreateSubtask from '../Create/CreateSubtask';
import SingleSubtask from '../Single/SingleSubtask';

import styles from './SubtasksAll.module.css';

function SubtasksAll({ taskId, subtasks, loadTasks, onCancelFormHandler }) {
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

    return (
        <div className={styles["checklist-all-current-task-subtasks-wrapper"]}>
            <h6 className={styles["checklist-all-current-task-subtasks-title"]}>Sub-tasks</h6>
            <div className={styles["checklist-all-current-task-subtasks-form-wrapper"]}>
                <CreateSubtask
                    taskId={taskId}
                    onCancelFormHandler={onCancelFormHandler}
                />
            </div>
            {subtasks.length > 0
                ? subtasks.map((st) =>
                    <SingleSubtask
                        taskId={taskId}
                        id={st.id}
                        description={st.description}
                        isDone={st.isDone}
                        onDoneSubtask={onDoneSubtask}
                    />
                )
                : <p className={styles["checklist-all-empty-subtasks"]}>No sub-tasks yet</p>
            }
            <div className={styles["checklist-all-current-task-subtasks-form-icon-wrapper"]}>
                <div className="form-icon-wrapper">
                    <i onClick={onShowSubTaskFormHandler} className="fa-solid fa-plus"></i>
                    Add sub-task
                </div>
            </div>
        </div>
    );
}

export default SubtasksAll;