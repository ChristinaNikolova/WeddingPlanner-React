import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as global from '../../../utils/constants/global';
import * as tasksService from '../../../services/tasks';

import CreateTask from '../Create/CreateTask';

import styles from './TasksAll.module.css';

function ChecklistAll() {
    //todo remove @import constant from css
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
                            </div>
                            <p className={styles["checklist-all-end-content"]}>***</p>
                        </div>
                    )}
                    {tasks.map((t) => <div>{t.title}</div>)}
                    {/* {events.length
                        ? events.map((e) =>
                            <SingleEvent
                                key={e.id}
                                id={e.id}
                                title={e.title}
                                startTime={e.startTime}
                                endTime={e.endTime}
                                duration={e.duration}
                                isHighlighted={e.isHighlighted}
                                isEditIconHidden={isEditIconHidden}
                                onHeightlightHandler={onHeightlightHandler}
                                onDeleteHandler={onDeleteHandler}
                                onShowFormHandler={onShowFormHandler}
                            />)
                        : <p className="empty empty-planner">No events yet</p>
                    } */}
                </div>
            </section>
        </>
    )
}

export default ChecklistAll;