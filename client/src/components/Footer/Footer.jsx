import './Footer.css';

function Footer() {
    return (
        <footer id="footer">
            <nav className="footer-nav">
                <ul className="footer-nav-ul">
                    <li className="footer-nav-li logo">
                        <a href="/">Wedding Planner</a>
                    </li>
                </ul>
                <ul className="footer-nav-ul gold-underline">
                    <li className="footer-nav-li">
                        <a href="/">Plan your wedding</a>
                    </li>
                    <li className="footer-nav-li">
                        <a href="/">Wedding's blog</a>
                    </li>
                    <li className="footer-nav-li">
                        <a href="/">Login</a>
                    </li>
                    <li className="footer-nav-li">
                        <a href="/">Register</a>
                    </li>
                </ul>
                <ul className="footer-nav-ul">
                    <li className="footer-nav-li">
                        <a href="https://github.com/ChristinaNikolova/WeddingPlanner" target="_blank">WeddingPlanner&copy;</a> - {new Date().getFullYear()}
                    </li>
                </ul>
            </nav>

        </footer >
    );
}

export default Footer;