import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';

import styles from './Footer.module.css';

function Footer() {
    const { isAuthenticated } = useContext(AuthContext);

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
                        <Link to="/plan">Plan your wedding</Link>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <Link to="/blog?page=1&category=all">Wedding's blog</Link>
                    </li>
                    {isAuthenticated
                        ?
                        <>
                            <li className={styles["footer-nav-li"]}>
                                <Link to="/user/favourite-article">Favourite</Link>
                            </li>
                            <li className={styles["footer-nav-li"]}>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className={styles["footer-nav-li"]}>
                                <Link to="/login">Login</Link>
                            </li>
                            <li className={styles["footer-nav-li"]}>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    }

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