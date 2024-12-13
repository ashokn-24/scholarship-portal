import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useUser } from "../context/UserContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { accessToken } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(res.data.user);
      } catch (err) {
        console.log("UserDashboard useEffect", err);
        setError(error);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [accessToken]);

  useEffect(() => {
    if (!error) return;
    swal("Error", error.message, "error");
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
          {/*Submit user details*/}
          {loading ? (
            <Spinner />
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b">Reference Id</th>
                  <th className="py-2 px-4 border-b">User</th>
                  <th className="py-2 px-4 border-b">Submission Date</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.surveyresults.map((survey) => (
                  <tr key={survey.id}>
                    <td className="py-2 px-4 border-b text-center">
                      {survey.referenceId}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {survey.firstName}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(survey.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b flex gap-5 justify-center">
                      <Link
                        to={`/survey/${survey.id}`}
                        className="bg-green-700 text-white block px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
