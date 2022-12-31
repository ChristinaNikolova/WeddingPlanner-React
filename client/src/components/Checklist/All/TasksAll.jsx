import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as global from '../../../utils/constants/global';
import * as tasksService from '../../../services/tasks';

import CreateTask from '../Create/CreateTask';
import UpdateTask from '../Update/UpdateTask';
import CreateSubtask from '../Subtask/Create/CreateSubtask';

import styles from './TasksAll.module.css';

function ChecklistAll() {
    //todo check css
    //todo check css with html
    //todo class for empty and not empty sections (css simular)
    //todo add logic for checkbox
    //todo update target/progress by adding new subtasks
    //todo change background colow when task done also stricke 
    //todo constants for classes
    //todo add ref to scroll to the forms
    //todo TasksAll_checklist-all-current-task-wrapper__7ovpG text-transform change!!!, by errors

    const { id: plannerId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');
    const [timespan, setTimespan] = useState('');

    useEffect(() => {
        loadTasks();
    }, [taskId]);

    const onMouseEnterHandler = (e) => {
        e.target.children[0].style.display = 'inline-block';
    }

    const onMouseLeaveHandler = () => {
        Array.from(document.getElementsByClassName('checklist-all-current-task-icons')).forEach((el) => {
            el.style.display = 'none';
        });
    }

    const onShowTaskFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.parentElement.nextSibling;
        targetFormElement.style.display = 'flex';

        const timeSpanValue = targetFormElement.previousSibling.children[0].innerText.toLowerCase();
        setTimespan(timeSpanValue);
    }

    const onShowSubTaskFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.previousSibling.previousSibling;
        targetFormElement.style.display = 'flex';
    }

    const onCancelFormHandler = (e) => {
        let targetElement = '';

        if (e.target.classList.contains('form-width')) {
            targetElement = e.target.parentElement;
        } else {
            targetElement = e.target.parentElement.parentElement.parentElement;
        }

        setTaskId('');
        setCurrentIndex('');
        targetElement.style.display = 'none';
    }

    const onShowContent = (e) => {
        const targetIcon = e.target
        const targetElement = targetIcon.parentElement.parentElement.parentElement.nextSibling;

        targetElement.style.display === 'none'
            ? targetElement.style.display = 'block'
            : targetElement.style.display = 'none';

        if (targetIcon.classList.contains("fa-chevron-down")) {
            targetIcon.classList.remove("fa-chevron-down");
            targetIcon.classList.add("fa-chevron-right");
        } else {
            targetIcon.classList.remove("fa-chevron-right");
            targetIcon.classList.add("fa-chevron-down");
        }
    }

    const onDeleteHandler = (id) => {
        tasksService
            .deleteById(id)
            .then(() => {
                loadTasks();
            })
            .catch((err) => console.error(err));
    }

    const onEditHandler = (id, index) => {
        setTaskId(id);
        setCurrentIndex(index);
    }

    const loadTasks = () => {
        tasksService
            .all(plannerId)
            .then((res) => setTasks(res))
            .catch((err) => console.error(err));
    }

    return (
        <>
            <section className="section-planner section-background">
                <div className="section-title-wrapper">
                    <h2 className="section-title">The big day</h2>
                </div>
                <div className={styles["checklist-all-main-content-wrapper"]}>
                    {global.timespans.map((time, index) =>
                        <div key={index} className={styles["checklist-all-timespan-wrapper"]}>
                            <div className={styles["checklist-all-timespan-content-wrapper"]}>
                                <div className={styles["checklist-all-timespan-title-wrapper"]}>
                                    <p className={styles["checklist-all-timespan"]}>
                                        {time}
                                    </p>
                                    {!taskId &&
                                        <div className="form-icon-wrapper">
                                            <i onClick={onShowTaskFormHandler} className="fa-solid fa-plus"></i>
                                            Add task
                                        </div>
                                    }
                                </div>
                                {taskId
                                    && index === currentIndex
                                    && <UpdateTask
                                        plannerId={plannerId}
                                        taskId={taskId}
                                        loadTasks={loadTasks}
                                        onCancelFormHandler={onCancelFormHandler}
                                    />
                                }
                                {!taskId &&
                                    <CreateTask
                                        plannerId={plannerId}
                                        timespan={timespan}
                                        loadTasks={loadTasks}
                                        onCancelFormHandler={onCancelFormHandler}
                                    />
                                }
                                <div className={styles["checklist-all-line"]}></div>
                                <div className={styles["checklist-all-tasks-content-wrapper"]}>
                                    {tasks.filter((t) => t.timespan === time).length > 0
                                        ? tasks.filter((t) => t.timespan === time).map((t) =>
                                            <div key={t.id} className={styles["checklist-all-current-task-wrapper"]}>
                                                <div className={styles["checklist-all-current-task-header-wrapper"]}>
                                                    <h4 onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles["checklist-all-current-task-header-title"]}>{t.title}
                                                        <span className="checklist-all-current-task-icons" style={{ display: 'none' }}>
                                                            {!taskId && <i onClick={() => onEditHandler(t.id, index)} className="fa-solid fa-pen"></i>}
                                                            <i onClick={() => onDeleteHandler(t.id)} className="fa-solid fa-trash"></i>
                                                        </span>
                                                    </h4>
                                                    <div className={styles["checklist-all-current-task-header-content-wrapper"]}>
                                                        <div className={styles["checklist-all-current-task-header-content-progress-wrapper"]}>
                                                            <span className={styles["checklist-all-current-task-progress"]}>{t.progress}</span>
                                                            <span className={styles["checklist-all-current-task-delimiter"]}>/</span>
                                                            <span className={styles["checklist-all-current-task-target"]}>{t.target}</span>
                                                        </div>
                                                        <div className={styles["checklist-all-current-task-header-content-icon-wrapper"]}>
                                                            <i onClick={onShowContent} className="fa-solid fa-chevron-right"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["checklist-all-current-task-info-warpper"]} style={{ display: 'none' }}>
                                                    <p className={styles["checklist-all-current-task-info-desc"]}>
                                                        {t.description}
                                                    </p>
                                                    <div className={styles["checklist-all-current-task-subtasks-wrapper"]}>
                                                        <h6 className={styles["checklist-all-current-task-subtasks-title"]}>Sub-tasks</h6>
                                                        <CreateSubtask
                                                            taskId={t.id}
                                                            onCancelFormHandler={onCancelFormHandler}
                                                        />
                                                        {t.subtasks.length > 0
                                                            ? t.subtasks.map((st) =>
                                                                <div className={styles["checklist-all-current-task-current-subtask"]}>
                                                                    <input type="checkbox" checked />
                                                                    <p className={styles["checklist-all-current-task-current-subtask-description"]}>{st.description}</p>
                                                                </div>
                                                            )
                                                            : <p className={`${styles["checklist-all-empty"]} ${styles["checklist-all-empty-sub-tasks"]}`}>No sub-tasks yet</p>
                                                        }
                                                        <div className="form-icon-wrapper">
                                                            <i onClick={onShowSubTaskFormHandler} className="fa-solid fa-plus"></i>
                                                            Add sub-task
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : <p className={`${styles["checklist-all-empty"]} ${styles["checklist-all-empty-tasks"]}`}>No tasks yet</p>
                                    }
                                </div>
                            </div>
                            <p className={styles["checklist-all-end-content"]}>***</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ChecklistAll;