import './Header.css';

function Header() {
    return (
        <header id="header">
            <nav className="header-nav">
                <ul className="header-nav-ul">
                    <li className="header-nav-li">
                        <a href="">Plan your wedding</a>
                    </li>
                    <li className="header-nav-li">
                        <a href="">Wedding's blog</a>
                    </li>
                    <li className="header-nav-li logo">
                        <a href="">
                            Wedding Planner
                        </a>
                    </li>
                    <li className="header-nav-li">
                        <a href="">Login</a>
                    </li>
                    <li className="header-nav-li">
                        <a href="">Register</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;