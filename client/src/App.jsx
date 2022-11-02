import * as authService from './services/auth';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();

    const firstName = 'plamen';
    const lastName = 'nikolov';
    const email = 'plamen@abv.bg';
    const password = '123456';

    authService
      .register(firstName, lastName, email, password)
      .then((res) => console.log(res));
  };
  return (<>
    <Header />
    <Home />
    <Footer />
  </>

  );
}

export default App;
