import { NavLink } from 'react-router-dom';

import { styleNames } from '../../../utils/constants/global';

import styles from './HamburgerHeader.module.css';

function HamburgerHeader({ isAuthenticated, isAdmin, setNavStyle, setInitialCssStyles }) {
    return (
        <ul className="header-nav-ul-hamburger" style={{ display: styleNames.NONE }}>
            <li className={styles["header-nav-li-hamburger"]}>
                <NavLink className={setNavStyle} to="/plan" onClick={setInitialCssStyles}>Plan your wedding</NavLink>
            </li>
            <li className={styles["header-nav-li-hamburger"]}>
                <NavLink className={setNavStyle} to="/blog?page=1&category=all" onClick={setInitialCssStyles}>Wedding's blog</NavLink>
            </li>
            {isAuthenticated
                ?
                <>
                    <li className={styles["header-nav-li-hamburger"]}>
                        <NavLink className={setNavStyle} to="/user/favourite-article" onClick={setInitialCssStyles}>Favourite</NavLink>
                    </li>
                    {isAdmin &&
                        <li className={styles["header-nav-li-hamburger"]}>
                            <NavLink className={setNavStyle} to="/administration" onClick={setInitialCssStyles}>Administration</NavLink>
                        </li>
                    }
                    <li className={styles["header-nav-li-hamburger"]}>
                        <NavLink className={setNavStyle} to="/logout" onClick={setInitialCssStyles}>Logout</NavLink>
                    </li>
                </>
                :
                <>
                    <li className={styles["header-nav-li-hamburger"]}>
                        <NavLink className={setNavStyle} to="/login" onClick={setInitialCssStyles}>Login</NavLink>
                    </li>
                    <li className={styles["header-nav-li-hamburger"]}>
                        <NavLink className={setNavStyle} to="/register" onClick={setInitialCssStyles}>Register</NavLink>
                    </li>
                </>
            }
        </ul>
    );
}

export default HamburgerHeader;