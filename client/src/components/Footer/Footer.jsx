import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles["footer-nav"]}>
                <ul className={styles["footer-nav-ul"]}>
                    <li className={`${styles["footer-nav-li"]} logo`}>
                        <a href="/">Wedding Planner</a>
                    </li>
                </ul>
                <ul className={`${styles["footer-nav-ul"]} gold-underline`}>
                    <li className={styles["footer-nav-li"]}>
                        <a href="/">Plan your wedding</a>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <a href="/">Wedding's blog</a>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <a href="/">Login</a>
                    </li>
                    <li className={styles["footer-nav-li"]}>
                        <a href="/">Register</a>
                    </li>
                </ul>
                <ul className={styles["footer-nav-ul"]}>
                    <li className={styles["footer-nav-li"]}>
                        <a href="https://github.com/ChristinaNikolova/WeddingPlanner" target="_blank">WeddingPlanner&copy;</a> - {new Date().getFullYear()}
                    </li>
                </ul>
            </nav>

        </footer >
    );
}

export default Footer;