import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles["footer-nav"]}>
                <ul className={styles["footer-nav-ul"]}>
                    <li className={`${styles["footer-nav-li"]} logo`}>
                        <Link to="/">Wedding Planner</Link>
                    </li>
                </ul>
                <ul className={`${styles["footer-nav-ul"]} gold-underline`}>
                    <li className={styles["footer-nav-li"]}>
                        <Link to="/">Plan your wedding</Link>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <Link to="/">Wedding's blog</Link>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
                <ul className={styles["footer-nav-ul"]}>
                    <li className={styles["footer-nav-li"]}>
                        <a href="https://github.com/ChristinaNikolova/WeddingPlanner" rel="noreferrer" target="_blank">WeddingPlanner&copy;</a> - {new Date().getFullYear()}
                    </li>
                </ul>
            </nav>

        </footer >
    );
}

export default Footer;