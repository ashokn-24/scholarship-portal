/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import Spinner from "./components/Spinner";

const AdminOnly = ({ children }) => {
  const { loading, user, accessToken } = useUser();

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/sign-in" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminOnly;
