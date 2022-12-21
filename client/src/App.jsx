import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import * as constants from './utils/constants/paths';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Logout from './components/Auth/Logout/Logout';
import ArticlesAll from './components/Blog/ArticlesAll/ArticlesAll';
import ArticleDetails from './components/Blog/ArticleDetails/ArticleDetails';
import FavouriteArticle from './components/User/FavouriteArticle/FavouriteArticle';
import PlannerDashboard from './components/Planner/Dashboard/Dashboard';
import CreatePlanner from './components/Planner/Create/CreatePlanner';
import NotFound from './components/NotFound/NotFound';
import Loading from './components/shared/Loading/Loading';

import './App.css';

const AdminDashboard = lazy(() => import('./components/Administration/Dashboard/Dashboard'));
const CreateArticle = lazy(() => import('./components/Administration/Articles/Create/CreateArticle'));
const UpdateArticle = lazy(() => import('./components/Administration/Articles/Update/UpdateArticle'));
const AllCategories = lazy(() => import('./components/Administration/Categories/All/AllCategories'));
const CreateCategory = lazy(() => import('./components/Administration/Categories/Create/CreateCategory'));
const UpdateCategory = lazy(() => import('./components/Administration/Categories/Update/UpdateCategory'));

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route path="/blog" element={<ArticlesAll pathToImage={constants.paths.JUMBO_BLOG} />} />
        <Route path="/blog/:id/" element={<ArticleDetails />} />
        <Route path="/user/favourite-article" element={<FavouriteArticle pathToImage={constants.paths.JUMBO_USER} />} />

        <Route path="/plan" element={<PlannerDashboard />} />
        <Route path="/plan/create" element={<CreatePlanner />} />

        <Route path="/administration" element={
          <Suspense fallback={<Loading />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="/administration/articles/create" element={
          <Suspense fallback={<Loading />}>
            <CreateArticle />
          </Suspense>
        } />
        <Route path="/administration/articles/edit/:id" element={
          <Suspense fallback={<Loading />}>
            <UpdateArticle />
          </Suspense>
        } />
        <Route path="/administration/categories" element={
          <Suspense fallback={<Loading />}>
            <AllCategories />
          </Suspense>
        } />
        <Route path="/administration/categories/create" element={
          <Suspense fallback={<Loading />}>
            <CreateCategory />
          </Suspense>
        } />
        <Route path="/administration/categories/edit/:id" element={
          <Suspense fallback={<Loading />}>
            <UpdateCategory />
          </Suspense>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
