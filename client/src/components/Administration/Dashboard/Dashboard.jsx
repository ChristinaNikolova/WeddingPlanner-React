import { Link } from 'react-router-dom';

import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <section className="section section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">Administration</h2>
            </div>
            <div className={styles["dashboard-content-wrapper"]}>
                <img className={`${styles["dashboard-img"]} img-shadow`} src="./img/groom-505683_1920.jpg" alt="groom" />
                <ul className={styles["dashboard-ul"]}>
                    <li className={styles["dashboard-li", "title-li"]}>Articles</li>
                    <li className={styles["dashboard-li"]}>
                        <Link className="navigation-link btn" to="/administration/articles/create">Create Article</Link>
                    </li>
                    <li className={styles["dashboard-li", "title-li"]}>Categories</li>
                    <li className={styles["dashboard-li"]}>
                        <Link className="navigation-link btn" to="/administration/categories">All Categories</Link>
                    </li>
                    <li className={styles["dashboard-li"]}>
                        <Link className="navigation-link btn" to="/administration/categories/create">Create Category</Link>
                    </li>
                </ul>
                <img className={`${styles["dashboard-img"]} img-shadow`} src="./img/bride-428105_1920.jpg" alt="bride" />
            </div>
        </section>
    );
}

export default Dashboard;