/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import Spinner from "./Spinner"; // Assuming you have a Spinner component
import swal from "sweetalert";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { accessToken } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    totalusersRegistred: 0,
    totalSurveysSubmitted: 0,
  });

  const BASE_URL = import.meta.env.VITE_BASEURL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log("Admin Dashboard useEffect: ", err);
        setError(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    if (!error) return;
    swal("Error", error.message, "error");
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{t("surveyDashboard")}</h2>
          </div>
          <div className="flex justify-start py-2">
            <Link
              to="/"
              className="text-black block text-md px-4 py-2 rounded-lg flex items-center gap-5"
            >
              <FaArrowLeft />
              {t("back")}
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="h-10 p-5 m-2 flex items-center gap-10 w-full">
                <span className="flex-grow">
                  <strong>{t("userRegistered")}</strong>{" "}
                  {data.totalusersRegistred}
                </span>
                <Link
                  to="/admin/users"
                  className="bg-green-700 text-white block px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {t("details")}
                </Link>
              </div>
              <div className="h-10 p-5 m-2 flex items-center gap-10 w-full">
                <span className="flex-grow">
                  <strong>{t("userFormSubmitted")}</strong>{" "}
                  {data.totalSurveysSubmitted}
                </span>
                <Link
                  to="/admin/survey"
                  className="bg-green-700 text-white block px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {t("details")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
