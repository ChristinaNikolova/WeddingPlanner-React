import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";
import * as constants from "./utils/constants/images";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Logout from "./components/Auth/Logout/Logout";
import ArticlesAll from "./components/Blog/ArticlesAll/ArticlesAll";
import ArticleDetails from "./components/Blog/ArticleDetails/ArticleDetails";
import FavouriteArticle from "./components/User/FavouriteArticle/FavouriteArticle";
import PlannerDashboard from "./components/Planner/Dashboard/Dashboard";
import CreatePlanner from "./components/Planner/Create/CreatePlanner";
import DetailsPlanner from "./components/Planner/Details/DetailsPlanner";
import UpdatePlanner from "./components/Planner/Update/UpdatePlanner";
import GuestsAll from "./components/Guest/All/GuestsAll";
import AllCosts from "./components/Budget/All/AllCosts";
import ChecklistAll from "./components/Checklist/Task/All/TasksAll";
import EventsAll from "./components/Event/All/EventsAll";
import NotesAll from "./components/Note/All/NotesAll";
import NotFound from "./components/NotFound/NotFound";
import Loading from "./components/shared/Loading/Loading";

import AdminRoute from "./components/common/AdminRoute";
import GuestRoute from "./components/common/GuestRoute";
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

const AdminDashboard = lazy(() =>
  import("./components/Administration/Dashboard/Dashboard")
);
const CreateArticle = lazy(() =>
  import("./components/Administration/Articles/Create/CreateArticle")
);
const UpdateArticle = lazy(() =>
  import("./components/Administration/Articles/Update/UpdateArticle")
);
const AllCategories = lazy(() =>
  import("./components/Administration/Categories/All/AllCategories")
);
const CreateCategory = lazy(() =>
  import("./components/Administration/Categories/Create/CreateCategory")
);
const UpdateCategory = lazy(() =>
  import("./components/Administration/Categories/Update/UpdateCategory")
);

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={<ArticlesAll pathToImage={constants.jumbo.BLOG} />}
        />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/blog/:id/" element={<ArticleDetails />} />
          <Route
            path="/user/favourite-article"
            element={<FavouriteArticle pathToImage={constants.jumbo.USER} />}
          />

          <Route path="/plan" element={<PlannerDashboard />} />
          <Route path="/plan/create" element={<CreatePlanner />} />
          <Route path="/plan/:id" element={<DetailsPlanner />} />
          <Route path="/plan/edit/:id" element={<UpdatePlanner />} />

          <Route path="/:id/guest" element={<GuestsAll />} />
          <Route path="/:id/budget" element={<AllCosts />} />
          <Route path="/:id/checklist" element={<ChecklistAll />} />
          <Route path="/:id/event" element={<EventsAll />} />
          <Route path="/:id/note" element={<NotesAll />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/administration"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="/administration/articles/create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateArticle />
              </Suspense>
            }
          />
          <Route
            path="/administration/articles/edit/:id"
            element={
              <Suspense fallback={<Loading />}>
                <UpdateArticle />
              </Suspense>
            }
          />
          <Route
            path="/administration/categories"
            element={
              <Suspense fallback={<Loading />}>
                <AllCategories />
              </Suspense>
            }
          />
          <Route
            path="/administration/categories/create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateCategory />
              </Suspense>
            }
          />
          <Route
            path="/administration/categories/edit/:id"
            element={
              <Suspense fallback={<Loading />}>
                <UpdateCategory />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
