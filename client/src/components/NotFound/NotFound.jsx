import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';



//className={styles["header"]}
//{`${styles["header-nav-li"]} logo gold-underline`}

function NotFound() {
    return (
        <section className={`${styles["not-found"]} section`}>
            <h2 className={styles["not-found-main-title"]}>404</h2>
            <h4 className={styles["not-found-sub-title"]}>Page not found</h4>
            <p className={styles["not-found-content"]}>
                Sorry, the page you are looking for doesn't exist
            </p>
            <Link to="/" className="btn">Go back to home</Link>
        </section>
    );
}

export default NotFound;