import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { timespans, classNames, styleNames } from '../../../../utils/constants/global';
import * as tasksService from '../../../../services/tasks';

import SingleTask from '../Single/SingleTask';
import CreateTask from '../Create/CreateTask';
import UpdateTask from '../Update/UpdateTask';
import AddButton from '../../../shared/Buttons/Add/AddButton';

import styles from './TasksAll.module.css';

function ChecklistAll() {
    //todo test again!!!

    const { id: plannerId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');
    const [timespan, setTimespan] = useState('');
    const tasksAllRef = useRef(null);

    useEffect(() => {
        loadTasks();
        tasksAllRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const onShowTaskFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.parentElement.nextSibling;
        targetFormElement.style.display = styleNames.FLEX;

        const timeSpanValue = targetFormElement.previousSibling.children[0].innerText.toLowerCase();
        setTimespan(timeSpanValue);
    }

    const onCancelFormHandler = (e) => {
        let targetElement = '';

        if (e.target.classList.contains(classNames.FORM_WIDTH)) {
            targetElement = e.target.parentElement;
        } else {
            targetElement = e.target.parentElement.parentElement.parentElement;
        }

        setTaskId('');
        setCurrentIndex('');
        targetElement.style.display = styleNames.NONE;
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

    console.log()

    return (
        <section ref={tasksAllRef} className="section-planner section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">The big day</h2>
            </div>
            <div className={styles["checklist-all-main-content-wrapper"]}>
                {timespans.map((time, index) =>
                    <div key={index} className={styles["checklist-all-timespan-wrapper"]}>
                        <div className={styles["checklist-all-timespan-content-wrapper"]}>
                            <div className={styles["checklist-all-timespan-title-wrapper"]}>
                                <p className={styles["checklist-all-timespan"]}>{time}</p>
                                {!taskId
                                    && <AddButton
                                        classNames={[]}
                                        text={"task"}
                                        isEmptyString={false}
                                        onShowFormHandler={onShowTaskFormHandler}
                                    />
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
                                        <SingleTask
                                            key={t.id}
                                            index={index}
                                            taskId={taskId}
                                            id={t.id}
                                            title={t.title}
                                            description={t.description}
                                            progress={t.progress}
                                            target={t.target}
                                            subtasks={t.subtasks}
                                            loadTasks={loadTasks}
                                            onEditHandler={onEditHandler}
                                            onDeleteHandler={onDeleteHandler}
                                            onCancelFormHandler={onCancelFormHandler}
                                        />
                                    )
                                    : <p className={styles["checklist-all-empty-tasks"]}>No tasks yet</p>
                                }
                            </div>
                        </div>
                        <p className={styles["checklist-all-end-content"]}>***</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ChecklistAll;