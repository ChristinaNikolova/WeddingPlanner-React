import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as eventsService from '../../../services/events';
import CreateEvent from '../Create/CreateEvent';

import styles from './EventsAll.module.css';

function EventsAll() {
    const { id: plannerId } = useParams();
    const [events, setEvents] = useState([]);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const onCancelFormHandler = () => {
        setIsHidden(true);
    }

    const onShowFormHandler = (eventId) => {
        setIsHidden(!isHidden);
    }

    const loadEvents = () => {
        eventsService
            .all(plannerId)
            .then((res) => setEvents(res))
            .catch((err) => console.error(err));
    }
    console.log(events);

    return (
        <section className={styles["events-all"]}>
            <div className="section-title-wrapper">
                <h2 className="section-title">The big day</h2>
            </div>
            <div className={styles["events-all-main-content-wrapper"]}>
                {events.length
                    ? events.map((e) => <div>Event</div>)
                    : <p className={[styles["events-all-empty"], "empty"].join(' ')}>No events yet</p>
                }
            </div>
            <CreateEvent
                plannerId={plannerId}
                isHidden={isHidden}
                onCancelFormHandler={onCancelFormHandler}
                onShowFormHandler={onShowFormHandler}
                loadEvents={loadEvents}
            />
            {/* {eventId
                ? <UpdateNote
                    noteId={noteId}
                    plannerId={plannerId}
                    onCancelFormHandler={onCancelFormHandler}
                    loadGuests={loadNotes}
                />
                : <CreateNote
                    plannerId={plannerId}
                    isHidden={isHidden}
                    onCancelFormHandler={onCancelFormHandler}
                    onShowFormHandler={onShowFormHandler}
                    loadNotes={loadNotes}
                />
            } */}
        </section>
    );
}

export default EventsAll