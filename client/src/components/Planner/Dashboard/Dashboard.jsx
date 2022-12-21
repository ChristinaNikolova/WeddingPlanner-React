import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as plannersService from '../../../services/planners';
import * as constants from '../../../utils/constants/paths';

import Bottom from '../../shared/ImageWrappers/Bottom/Bottom';

import styles from './Dashboard.module.css';

function Dashboard() {
    //todo create var for the images

    const [planners, setPlanners] = useState([]);

    useEffect(() => {
        plannersService
            .all()
            .then((res) => setPlanners(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="dashboard section section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">Plan you wedding</h2>
            </div>
            <div className={styles["dashboard-content-wrapper"]}>
                <div className={styles["dashboard-left-wrapper"]}>
                    <h2 className={styles["dashboard-left-title"]}>My planners</h2>
                    {planners.length
                        ? planners.map((p) =>
                            <Link className={styles["dashboard-left-link"]} to={`/wedding/${p.id}`}>
                                <i class="fa-solid fa-heart"></i>
                                {p.title}
                            </Link>)
                        : <p className={styles["dashboard-left-no-planners"]}>No planners yet</p>
                    }
                </div>
                <div className={styles["dashboard-right-wrapper"]}>
                    <Link to="/plan/create" className='btn'>Create new planner</Link>
                </div>
            </div>
            <Bottom
                first={constants.paths.BOTTOM_FIRST}
                second={constants.paths.BOTTOM_SECOND}
                third={constants.paths.BOTTOM_THIRD}
            />
        </section>
    );
}

export default Dashboard;