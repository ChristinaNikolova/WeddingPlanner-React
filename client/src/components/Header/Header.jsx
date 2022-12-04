import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';

import styles from './Header.module.css';

function Header() {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

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
                        <NavLink className={setNavStyle} to="/blog?page=1">Wedding's blog</NavLink>
                    </li>
                    <li className={`${styles["header-nav-li"]} logo gold-underline`}>
                        <Link to="/">Wedding Planner</Link>
                    </li>
                    {isAuthenticated
                        ?
                        <>
                            <li className={styles["header-nav-li"]}>
                                <NavLink className={setNavStyle} to="/profile">Profile</NavLink>
                            </li>
                            {isAdmin &&
                                <li className={styles["header-nav-li"]}>
                                    <NavLink className={setNavStyle} to="/administration">Administration</NavLink>
                                </li>
                            }
                            <li className={styles["header-nav-li"]}>
                                <NavLink className={setNavStyle} to="/logout">Logout</NavLink>
                            </li>
                        </>
                        :
                        <>
                            <li className={styles["header-nav-li"]}>
                                <NavLink className={setNavStyle} to="/login">Login</NavLink>
                            </li>
                            <li className={styles["header-nav-li"]}>
                                <NavLink className={setNavStyle} to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;