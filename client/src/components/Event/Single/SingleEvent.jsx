import styles from './SingleEvent.module.css'

function SingleEvent({ id, title, startTime, endTime, duration, isHighlighted, onHeightlightHandler }) {
    return (
        <div className={styles["events-all-main-wrapper"]}>
            <div className={styles["events-all-info-wrapper"]}>
                <div className={styles["events-all-info-left"]}>
                    <p className={styles["events-all-time"]}>
                        {startTime} - {endTime}
                    </p>
                    <p className={styles["events-all-duration"]}>
                        {duration}
                    </p>
                </div>
                <div className={styles["events-all-info-right"]}>
                    <p className={styles["events-all-title"]}>
                        {title}
                    </p>
                </div>
                {isHighlighted
                    ? <i onClick={() => onHeightlightHandler(id)} className="fa-solid fa-star"></i>
                    : <i onClick={() => onHeightlightHandler(id)} className="fa-regular fa-star"></i>
                }
            </div>
        </div >
    );
}

export default SingleEvent;