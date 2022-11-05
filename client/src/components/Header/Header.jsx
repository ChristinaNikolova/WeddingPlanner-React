import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles["header-nav"]}>
                <ul className={styles["header-nav-ul"]}>
                    <li className={styles["header-nav-li"]}>
                        <a href="/">Plan your wedding</a>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <a href="/">Wedding's blog</a>
                    </li>
                    <li className={`${styles["header-nav-li"]} logo gold-underline`}>
                        <a href="/">Wedding Planner</a>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <a href="/">Login</a>
                    </li>
                    <li className={styles["header-nav-li"]}>
                        <a href="/">Register</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;