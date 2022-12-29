import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as global from '../../../utils/constants/global';
import * as tasksService from '../../../services/tasks';

import styles from './ChecklistAll.module.css';

function ChecklistAll() {
    //todo remove @import constant from css

    const { id: plannerId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        tasksService
            .all(plannerId)
            .then((res) => setTasks(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(tasks);

    return (
        <>
            <section className="section-planner section-background">
                <div className="section-title-wrapper">
                    <h2 className="section-title">The big day</h2>
                </div>
                <div className={styles["checklist-all-main-content-wrapper"]}>
                    {global.timespans.map((time, i) =>
                        <div key={i} className={styles["checklist-all-timespan-wrapper"]}>
                            <div className={styles["checklist-all-timespan"]}>
                                {time}
                            </div>
                            <p className={styles["checklist-all-end-content"]}>***</p>
                        </div>
                    )}
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
                {/* {eventId
                    ? <UpdateEvent
                        eventId={eventId}
                        plannerId={plannerId}
                        onCancelFormHandler={onCancelFormHandler}
                        loadEvents={loadEvents}
                    />
                    : <CreateEvent
                        plannerId={plannerId}
                        isHidden={isHidden}
                        onCancelFormHandler={onCancelFormHandler}
                        onShowFormHandler={onShowFormHandler}
                        loadEvents={loadEvents}
                    />
                } */}
            </section>
        </>
    )
}

export default ChecklistAll;