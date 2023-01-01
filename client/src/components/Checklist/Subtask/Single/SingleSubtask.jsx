import styles from './SingleSubtask.module.css';

function SingleSubtask({ taskId, id, description, isDone, onDoneSubtask }) {
    const getStyles = (isDone) => {
        return isDone
            ? `${styles["checklist-all-current-task-current-subtask"]} ${styles["checklist-all-current-task-current-subtask-heightlight"]}`
            : styles["checklist-all-current-task-current-subtask"];
    }

    return (
        <div key={id} className={getStyles(isDone)}>
            {isDone
                ? <i onClick={() => onDoneSubtask(taskId, id)} className="fa-solid fa-square-check"></i>
                : <i onClick={() => onDoneSubtask(taskId, id)} className="fa-solid fa-square"></i>
            }
            <p className={styles["checklist-all-current-task-current-subtask-description"]}>{description}</p>
        </div>
    );
}

export default SingleSubtask;