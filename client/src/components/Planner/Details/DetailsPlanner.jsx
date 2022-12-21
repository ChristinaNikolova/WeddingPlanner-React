import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    return (
        <section className="details-planner section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">{planner.title}</h2>
            </div>
            <div className={styles["details-planner-content-wrapper"]} >
            </div>
        </section>
    );
}

export default DetailsPlanner;

{/* <span style={{ width: '200px', height: '600px' }}><img src="/img/Bride-PNG-Image-30858.png" alt="bride" style={{ width: '200px', height: '100%' }} /></span>
            <span style={{ width: '200px', height: '600px' }}><img src="/img/Groom-PNG-Image-95770.png" alt="groom" style={{ width: '200px', height: '100%', objectFit: 'cover' }} /></span>
 */}