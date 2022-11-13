import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Logout from './components/Auth/Logout/Logout';
import NotFound from './components/NotFound/NotFound';

import './App.css';

const Dashboard = lazy(() => import('./components/Administration/Dashboard/Dashboard'));
const CreateArticle = lazy(() => import('./components/Administration/Articles/Create/CreateArticle'));

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route path="/administration" element={
          <Suspense fallback={<span>Loading &hellip;</span>}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/administration/articles/create" element={
          <Suspense fallback={<span>Loading &hellip;</span>}>
            <CreateArticle />
          </Suspense>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
