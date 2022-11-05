import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    const setNavStyle = ({ isActive }) => {
        return isActive ? styles["header-active-li"] : undefined;
    }

    return (
        <header className={styles.header}>
            <nav className={styles["header-nav"]}>
                <ul className={styles["header-nav-ul"]}>
                    <li className={styles["header-nav-li"]}>
                        <NavLink className={setNavStyle} to="/plan">Plan your wedding</NavLink>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <NavLink className={setNavStyle} to="/blog">Wedding's blog</NavLink>
                    </li>
                    <li className={`${styles["header-nav-li"]} logo gold-underline`}>
                        <Link to="/">Wedding Planner</Link>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <NavLink className={setNavStyle} to="/login">Login</NavLink>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <NavLink className={setNavStyle} to="/register">Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;