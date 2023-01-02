import { styleNames, tagNames } from '../../../../utils/constants/global';

import styles from './SingleSubtask.module.css';

function SingleSubtask({ taskId, subtaskId, id, description, isDone, onDoneSubtask, onEditHandler, onDeleteHandler }) {
    const onMouseEnterHandler = (e) => {
        if (e.target.nodeName !== tagNames.P) {
            return;
        }

        e.target.children[0].style.display = styleNames.INLINE_BLOCK;
    }

    const onMouseLeaveHandler = () => {
        Array.from(document.getElementsByClassName('subtask-icons-wrapper')).forEach((el) => {
            el.style.display = styleNames.NONE;
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
                    {!subtaskId && <i onClick={() => onEditHandler(id)} className="fa-solid fa-pen"></i>}
                    <i onClick={() => onDeleteHandler(taskId, id)} className="fa-solid fa-trash"></i>
                </span>
            </p>

        </div>
    );
}

export default SingleSubtask;