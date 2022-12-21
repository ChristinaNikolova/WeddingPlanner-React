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

    return (
        <section className="details-planner section-background">
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
                <div className="details-planner-event-info">
                    <p className="details-planner-event-info-date">{planner.date}</p>
                    <p className="details-planner-event-info-location">{planner.location}</p>
                </div>
                <div className="details-planner-guests">
                    <Link className="btn" to='guest/create'>Add Guest</Link>
                    <Link className="btn" to='guest/create'>Guests</Link>
                    <Link className="btn" to='guest/create'>Tables</Link>
                    <p className="details-planner-total-guests"></p>
                    <p className="details-planner-confirmed-guests"></p>
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

{/* <span style={{ width: '200px', height: '600px' }}><img src="/img/Bride-PNG-Image-30858.png" alt="bride" style={{ width: '200px', height: '100%' }} /></span>
            <span style={{ width: '200px', height: '600px' }}><img src="/img/Groom-PNG-Image-95770.png" alt="groom" style={{ width: '200px', height: '100%', objectFit: 'cover' }} /></span>
 */}