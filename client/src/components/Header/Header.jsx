import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth';
import styles from './Header.module.css';

function Header() {
    const nagivate = useNavigate();
    const setNavStyle = ({ isActive }) => {
        return isActive ? styles["header-active-li"] : undefined;
    }

    const logout = () => {
        authService.logout()
            .then(() => {
                nagivate('/');
            })
            .catch((err) => console.error(err));
    };

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
                    <li className={styles["header-nav-li"]}>
                        <NavLink className={setNavStyle} onClick={logout}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;