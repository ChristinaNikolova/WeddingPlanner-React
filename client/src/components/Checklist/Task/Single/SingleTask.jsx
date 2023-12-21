import { styleNames, tagNames } from "../../../../utils/constants/global";
import { toggleWithTargetContent } from "../../../../utils/helpers/dropdown";

import styles from "./SingleTask.module.css";

function SingleTask({
  index,
  taskId,
  id,
  title,
  description,
  progress,
  target,
  children,
  onEditHandler,
  onDeleteHandler,
}) {
  const onMouseEnterHandler = (e) => {
    if (e.target.nodeName !== tagNames.H4) {
      return;
    }

    e.target.children[0].style.display = styleNames.INLINE_BLOCK;
  };

  const onMouseLeaveHandler = () => {
    Array.from(
      document.getElementsByClassName("checklist-all-current-task-icons")
    ).forEach((el) => {
      el.style.display = styleNames.NONE;
    });
  };

  const onShowContent = (e) => {
    const targetIcon = e.target;
    const targetElement =
      targetIcon.parentElement.parentElement.parentElement.nextSibling;
    toggleWithTargetContent(targetElement, targetIcon);
  };

  return (
    <div key={id} className={styles["checklist-all-current-task-wrapper"]}>
      <div className={styles["checklist-all-current-task-header-wrapper"]}>
        <h4
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={styles["checklist-all-current-task-header-title"]}
        >
          {title}
          <span
            className="checklist-all-current-task-icons"
            style={{ display: styleNames.NONE }}
          >
            {!taskId && (
              <i
                onClick={() => onEditHandler(id, index)}
                className="fa-solid fa-pen"
              ></i>
            )}
            <i
              onClick={() => onDeleteHandler(id)}
              className="fa-solid fa-trash"
            ></i>
          </span>
        </h4>
        <div
          className={
            styles["checklist-all-current-task-header-content-wrapper"]
          }
        >
          <div
            className={
              styles[
                "checklist-all-current-task-header-content-progress-wrapper"
              ]
            }
          >
            <span className={styles["checklist-all-current-task-progress"]}>
              {progress}
            </span>
            <span className={styles["checklist-all-current-task-delimiter"]}>
              /
            </span>
            <span className={styles["checklist-all-current-task-target"]}>
              {target}
            </span>
          </div>
          <div
            className={
              styles["checklist-all-current-task-header-content-icon-wrapper"]
            }
          >
            <i
              onClick={onShowContent}
              className="fa-solid fa-chevron-right"
            ></i>
          </div>
        </div>
      </div>
      <div
        className={styles["checklist-all-current-task-info-wrapper"]}
        style={{ display: styleNames.NONE }}
      >
        <p className={styles["checklist-all-current-task-info-desc"]}>
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}

export default SingleTask;
