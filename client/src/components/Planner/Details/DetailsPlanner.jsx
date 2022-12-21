import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as plannersService from '../../../services/planners';

import styles from './DetailsPlanner.module.css';

function DetailsPlanner() {
    const { id } = useParams();
    const [planner, setPlanner] = useState({});

    useEffect(() => {
        plannersService
            .getById(id)
            .then((res) => setPlanner(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(planner);
    //todo add description
    //todo hover effect on title to show edit and delete icons
    //todo extract components???

    return (
        <section className={styles["details-planner"]}>
            <div className="section-title-wrapper">
                <h2 className="section-title">{planner.title}</h2>
            </div>
            <div className={styles["details-planner-content-wrapper"]}>
                <div className={styles["details-planner-couple"]}>
                    <div className={styles["details-planner-img-wrapper"]}>
                        <img src="/img/Bride-PNG-Image-30858.png" alt="bride" />
                    </div>
                    <div className={styles["details-planner-img-wrapper"]}>
                        <img src="/img/Groom-PNG-Image-95770.png" alt="groom" />
                    </div>
                </div>
                <div className={styles["details-planner-event-info"]}>
                    <div className={styles["details-planner-time-location-wrapper"]}>
                        <p className={styles["details-planner-event-info-date"]}>
                            <h6 className={styles["details-planner-event-info-date-title"]}>Date:</h6>
                            {planner.date}
                        </p>
                        <p className={styles["details-planner-event-info-location"]}>
                            <h6 className={styles["details-planner-event-info-location-title"]}>Location:</h6>
                            {planner.location}
                        </p>
                    </div>
                    <p className={styles["details-planner-event-info-description"]}>{planner.description}</p>
                </div>
                <div className="details-planner-guests">
                    <h4 className="details-planner-guests-title">Guests</h4>
                    <div className="details-planner-guests-btns-wrapper">
                        <Link className="btn" to='guest/create'>Add Guest</Link>
                        <Link className="btn" to='guest/create'>Guests</Link>
                        <Link className="btn" to='guest/create'>Tables</Link>
                    </div>
                    <div className="details-planner-guests-info-wrapper">
                        <p className="details-planner-total-guests"></p>
                        <p className="details-planner-confirmed-guests"></p>
                    </div>
                </div>
                <div className="details-planner-budget">
                    <Link className="btn" to='guest/create'>Costs</Link>
                    <p className="details-planner-total-budget"></p>
                    <p className="details-planner-actual-cost"></p>
                </div>
                <div className="details-planner-checklist">
                    <Link className="btn" to='guest/create'>Checklist?????</Link>
                </div>
                <div className="details-planner-events">
                    <Link className="btn" to='guest/create'>Plan the day</Link>
                </div>
                <div className="details-planner-notes">
                    <Link className="btn" to='guest/create'>Notes</Link>
                </div>
            </div>
        </section>
    );
}

export default DetailsPlanner;