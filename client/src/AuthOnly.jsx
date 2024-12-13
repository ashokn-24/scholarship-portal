/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import { useUser } from "./context/UserContext";

const AuthOnly = ({ children }) => {
  const { accessToken, loading } = useUser();
  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : accessToken !== null ? (
    children
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default AuthOnly;
