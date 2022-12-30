import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as global from '../../../utils/constants/global';
import * as tasksService from '../../../services/tasks';

import CreateTask from '../Create/CreateTask';

import styles from './TasksAll.module.css';

function ChecklistAll() {
    //todo check css
    //todo check css with html
    //todo class for empty and not empty sections
    //todo add logic for checkbox
    //todo update target/progress by adding new subtasks
    //todo constants for classes

    const { id: plannerId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [timespan, setTimespan] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const onShowFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.parentElement.nextSibling;
        targetFormElement.style.display = 'flex';

        const timeSpanValue = targetFormElement.previousSibling.children[0].innerText.toLowerCase();
        setTimespan(timeSpanValue);
    }

    const onCancelFormHandler = (e) => {
        let targetElement = '';

        if (e.target.classList.contains('form-width')) {
            targetElement = e.target.parentElement;
        } else {
            targetElement = e.target.parentElement.parentElement.parentElement;
        }

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
                                    <div className="form-icon-wrapper">
                                        <i onClick={onShowFormHandler} className="fa-solid fa-plus"></i>
                                        Add task
                                    </div>
                                </div>
                                <CreateTask
                                    plannerId={plannerId}
                                    timespan={timespan}
                                    loadTasks={loadTasks}
                                    onCancelFormHandler={onCancelFormHandler}
                                />
                                <div className={styles["checklist-all-line"]}></div>
                                <div className={styles["checklist-all-tasks-content-wrapper"]}>
                                    {tasks.filter((t) => t.timespan === time).length > 0
                                        ? tasks.filter((t) => t.timespan === time).map((t) =>
                                            <div key={t.id} className={styles["checklist-all-current-task-wrapper"]}>
                                                <div className={styles["checklist-all-current-task-header-wrapper"]}>
                                                    <h4 className={styles["checklist-all-current-task-header-title"]}>{t.title}</h4>
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
                                                        <h6 className={styles["checklist-all-current-task-subtasks-title"]}>Subtasks</h6>
                                                        <div className={styles["checklist-all-current-task-current-subtask"]}>
                                                            <input type="checkbox" checked />
                                                            <p className={styles["checklist-all-current-task-current-subtask-description"]}>Subtask Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita velit rem consequuntur aspernatur numquam animi architecto totam aut exercitationem voluptatem. Fugit impedit eos facilis eaque aliquam sunt minima, sequi vel.</p>
                                                        </div>
                                                        <div className={styles["checklist-all-current-task-current-subtask"]}>
                                                            <input type="checkbox" checked />
                                                            <p className={styles["checklist-all-current-task-current-subtask-description"]}>Subtask Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis exercitationem rerum dolorum inventore eius voluptatum assumenda quidem, dolorem alias aliquid fugit error suscipit eveniet provident repellat repudiandae sunt labore cum.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : <p className={styles["checklist-all-empty-tasks"]}>No tasks yet</p>
                                    }
                                </div>
                            </div>
                            <p className={styles["checklist-all-end-content"]}>***</p>
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    )
}

export default ChecklistAll;