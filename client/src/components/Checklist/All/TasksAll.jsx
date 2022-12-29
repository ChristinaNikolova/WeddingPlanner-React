import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as global from '../../../utils/constants/global';
import * as tasksService from '../../../services/tasks';

import CreateTask from '../Create/CreateTask';

import styles from './TasksAll.module.css';

function ChecklistAll() {
    //todo check css

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
                                {tasks.filter((t) => t.timespan === time).length > 0
                                    ? tasks.filter((t) => t.timespan === time).map((t) => <div key={t.id}>{t.title}</div>)
                                    : <p className={styles["checklist-all-empty-tasks"]}>No tasks yet</p>
                                }
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