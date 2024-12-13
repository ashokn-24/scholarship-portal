/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { FaArrowLeft } from "react-icons/fa";

const ListUsers = () => {
  const { accessToken, loading: authLoad } = useUser();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken]);

  if (authLoad) return <Spinner />;
  if (loading) return <Spinner />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Users Details</h2>
          </div>
          <div className="flex justify-start py-2">
            <Link
              to="/admin/dashboard"
              className="text-black text-md px-4 py-2 rounded-lg flex items-center gap-5"
            >
              <FaArrowLeft />
              Back
            </Link>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b text-start">Full Name</th>
                <th className="py-2 px-4 border-b text-start">Email</th>
                <th className="py-2 px-4 border-b text-start">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="py-2 px-4 border-b text-start">
                      {user.fullName || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-start">
                      {user.email || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-start">
                      {user.role || "No role assigned"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 border-b text-center">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ListUsers;
