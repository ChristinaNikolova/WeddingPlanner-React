import styles from './SingleSubtask.module.css';

function SingleSubtask({ taskId, id, description, isDone, onDoneSubtask, onEditHandler, onDeleteHandler }) {
    const onMouseEnterHandler = (e) => {
        //todo check this error!
        e.target.children[0].style.display = 'inline-block';
    }

    const onMouseLeaveHandler = () => {
        Array.from(document.getElementsByClassName('subtask-icons-wrapper')).forEach((el) => {
            el.style.display = 'none';
        });
    }

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
            <p
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={styles["checklist-all-current-task-current-subtask-description"]}>
                {description}
                <span
                    className={`${styles["checklist-all-current-task-current-subtask-icons-wrapper"]} subtask-icons-wrapper`}
                    style={{ display: 'none' }}>
                    <i className="fa-solid fa-pen"></i>
                    <i onClick={() => onDeleteHandler(taskId, id)} className="fa-solid fa-trash"></i>
                </span>
            </p>

        </div>
    );
}

export default SingleSubtask;