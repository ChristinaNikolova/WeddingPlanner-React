import styles from './SingleEvent.module.css'

function SingleEvent({ id, title, startTime, endTime, duration }) {
    //todo check all css for event
    return (
        <div className={styles["events-all-info-wrapper"]}>
            <div className={styles["events-all-info-left"]}>
                <p className={styles["events-all-time"]}>
                    {startTime} - {endTime}
                </p>
                <p className={styles["events-all-time"]}>
                    {duration}
                </p>
            </div>
            <div className="events-all-info-right">
                <p className={styles["events-all-title"]}>
                    {title}
                </p>
            </div>
        </div>
    );
}

export default SingleEvent;