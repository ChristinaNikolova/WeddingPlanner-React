import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as eventsService from "../../../services/events";
import { scrollToTop } from "../../../utils/helpers/form";
import { addButtonTexts } from "../../../utils/constants/global";

import CreateEvent from "../Create/CreateEvent";
import SingleEvent from "../Single/SingleEvent";
import UpdateEvent from "../Update/UpdateEvent";
import AddButton from "../../shared/Buttons/Add/AddButton";

import styles from "./EventsAll.module.css";

function EventsAll() {
  const { id: plannerId } = useParams();
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isEditIconHidden, setIsEditIconHidden] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const onShowFormHandler = (eventId) => {
    setIsHidden(!isHidden);
    eventId ? setEventId(eventId) : setEventId("");
    setIsEditIconHidden(!isEditIconHidden);
  };

  const onCancelFormHandler = () => {
    setIsHidden(true);
    setEventId("");
    setIsEditIconHidden(false);
  };

  const onHeightlightHandler = (eventId) => {
    eventsService
      .heightlight(plannerId, eventId)
      .then(() => {
        loadEvents();
      })
      .catch((err) => console.error(err));
  };

  const onDeleteHandler = (eventId) => {
    eventsService
      .deleteById(eventId)
      .then(() => {
        loadEvents();
      })
      .catch((err) => console.error(err));
  };

  const loadEvents = () => {
    eventsService
      .all(plannerId)
      .then((res) => {
        setEvents(res);
        scrollToTop();
      })
      .catch((err) => console.error(err));
  };

  const finish = () => {
    onCancelFormHandler();
    loadEvents();
  };

  return (
    <section
      id={styles["events-all"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">The big day</h2>
      </div>
      <div className={styles["events-all-main-content-wrapper"]}>
        {events.length ? (
          events.map((e) => (
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
            />
          ))
        ) : (
          <p className="empty empty-planner">No events yet</p>
        )}
      </div>
      {eventId ? (
        <UpdateEvent
          eventId={eventId}
          plannerId={plannerId}
          onCancelFormHandler={onCancelFormHandler}
          finish={finish}
        />
      ) : (
        <>
          <AddButton
            classNames={["event-form-icon"]}
            text={addButtonTexts.EVENT}
            isEmptyString={true}
            onShowFormHandler={onShowFormHandler}
          />
          <CreateEvent
            plannerId={plannerId}
            isHidden={isHidden}
            onCancelFormHandler={onCancelFormHandler}
            finish={finish}
          />
        </>
      )}
    </section>
  );
}

export default EventsAll;
