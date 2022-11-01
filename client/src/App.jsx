import * as authService from './services/auth';
import './App.css';
import Home from './components/Home/Home';

function App() {
  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();

    const firstName = 'plamen';
    const lastName = 'nikolov';
    const email = 'plamen@abv.bg';
    const password = '123456';
    //const rePassword = e.target.repeatPassword.value;

    authService
      .register(firstName, lastName, email, password)
      .then((res) => console.log(res));
  };
  return (
    <Home />
  );
}

export default App;

  //  {/* <header className='header'>
  //       <nav className="header-nav">
  //         <ul className="header-nav-ul">
  //           <a>Blog</a>
  //           <a>Planner</a>
  //         </ul>
  //       </nav>
  //       <nav className="header-nav">
  //         <ul className="header-nav-ul">
  //           <li className="header-nav-li logo">
  //             <a>WeddingPlanner</a>
  //           </li>
  //         </ul>
  //       </nav>
  //       <nav className="header-nav">
  //         <ul className="header-nav-ul">
  //           <a>Login</a>
  //           <a>Register</a>
  //         </ul>
  //       </nav>
  //     </header> */}
  // {/* <form onSubmit={onRegisterSubmitHandler}>
  //       <input type="text" name="firstName" />
  //       <input type="text" name="lastName" />
  //       <input type="email" name="email" />
  //       <input type="password" name="password" />
  //       <input type="password" name="repass" />
  //       <button>Register</button>
  //     </form> */}
