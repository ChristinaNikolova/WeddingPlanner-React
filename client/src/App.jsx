import './App.css';

function App() {
  return (
    <div>
      {/* <header className='header'>
        <nav className="header-nav">
          <ul className="header-nav-ul">
            <a>Blog</a>
            <a>Planner</a>
          </ul>
        </nav>
        <nav className="header-nav">
          <ul className="header-nav-ul">
            <li className="header-nav-li logo">
              <a>WeddingPlanner</a>
            </li>
          </ul>
        </nav>
        <nav className="header-nav">
          <ul className="header-nav-ul">
            <a>Login</a>
            <a>Register</a>
          </ul>
        </nav>
      </header> */}
      <form action="">
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="password" name="repass" />
        <button>Register</button>
      </form>
    </div>
  );
}

export default App;
