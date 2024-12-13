import { Route, Routes, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Nav from "./components/Nav";
import SurveyComponent from "./components/SurveyComponent";
import Contact from "./components/Contact";
import UserSurvey from "./components/UserSurvey";
import AuthOnly from "./AuthOnly";
import AdminOnly from "./AdminOnly";
import Spinner from "./components/Spinner";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ListUsers from "./components/ListUsers";
import ListFormSubmited from "./components/ListFormSubmited";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/sign-in";
  const { loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/scholarships"
          element={
            <AuthOnly>
              <SurveyComponent />
            </AuthOnly>
          }
        />
        <Route path="/contact-us" element={<Contact />} />

        <Route
          path="/user/dashboard"
          element={
            <AuthOnly>
              <UserDashboard />
            </AuthOnly>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminOnly>
              <AdminDashboard />
            </AdminOnly>
          }
        />
        <Route
          path="/survey/:id"
          element={
            <AuthOnly>
              <UserSurvey />
            </AuthOnly>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminOnly>
              <ListUsers />
            </AdminOnly>
          }
        />
        <Route
          path="/admin/survey"
          element={
            <AdminOnly>
              <ListFormSubmited />
            </AdminOnly>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
