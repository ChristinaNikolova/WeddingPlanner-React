import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles["header-nav"]}>
                <ul className={styles["header-nav-ul"]}>
                    <li className={styles["header-nav-li"]}>
                        <Link to="/">Plan your wedding</Link>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <Link to="/">Wedding's blog</Link>
                    </li>
                    <li className={`${styles["header-nav-li"]} logo gold-underline`}>
                        <Link to="/">Wedding Planner</Link>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;