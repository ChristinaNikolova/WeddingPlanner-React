import { useState } from 'react';

import styles from './SingleEvent.module.css'

function SingleEvent({ id, title, startTime, endTime, duration, isHighlighted, onHeightlightHandler }) {
    const [isHovering, setIsHovering] = useState(false);

    const getStyles = () => {
        return isHighlighted
            ? `${styles["events-all-info-wrapper"]} ${styles["event-all-heightlight"]}`
            : styles["events-all-info-wrapper"];
    }

    const onMouseEnterHandler = () => {
        setIsHovering(true);
    }

    const onMouseLeaveHandler = () => {
        setIsHovering(false);
    }

    return (
        <div className={styles["events-all-main-wrapper"]}>
            <div onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={getStyles()}>
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
                    {isHovering &&
                        <span className={styles["events-all-icons"]}>
                            {<i className="fa-solid fa-pen"></i>}
                            {<i className="fa-solid fa-trash"></i>}
                        </span>
                    }
                </div>
                <div className={styles["events-all-star-icons-wrapper"]}>
                    {isHighlighted
                        ? <i onClick={() => onHeightlightHandler(id)} className="fa-solid fa-star"></i>
                        : <i onClick={() => onHeightlightHandler(id)} className="fa-regular fa-star"></i>
                    }
                </div>
            </div>
        </div >
    );
}

export default SingleEvent;