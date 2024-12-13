import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */

const ListFormSubmited = () => {
  const { accessToken, loading: authLoad } = useUser();
  const { t, i18n } = useTranslation(); // Add i18n
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ClientUrl = import.meta.env.VITE_CLIENTURL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/surveys`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSurveys(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load surveys");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const deleteSurvey = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSurveys((prevSurveys) =>
        prevSurveys.filter((survey) => survey.id !== id)
      );
      alert(t("surveyDeleted")); // Use translation for alert
    } catch (err) {
      console.log(err);
      alert(t("surveyDeleteFailed")); // Use translation for alert
    } finally {
      setLoading(false);
    }
  };

  const handleData = () => {
    const headers = [
      t("referenceId"),
      t("firstName"),
      t("surname"),
      t("familyName"),
      t("birthPlace"),
      t("dateOfBirth"),
      t("maritalStatus"),
      t("gender"),
      t("kuwaitResidency"),
      t("nationality"),
      t("passportNumber"),
      t("passportExpires"),
      t("college"),
      t("course"),
      t("personName"),
      t("telephone"),
      t("address"),
      t("email"),
      t("howDidYouFindUs"),
      t("nominatingInstitution"),
      t("directorName"),
      t("phoneNumber"),
      t("organizationEmail"),
      t("whoSupportsTheFamily"),
      t("doYouWork"),
      t("doYouVolunteer"),
      t("receiveGrant"),
      t("typeOfScholarship"),
      t("submissionDate"),
      t("link"),
    ];

    console.log(i18n.language);

    const rows = surveys.map((survey) => [
      survey.referenceId,
      survey.firstName,
      survey.surName,
      survey.familyName,
      survey.birthPlace,
      new Date(survey.dob).toLocaleDateString(i18n.language),
      survey.maritalStatus,
      survey.gender,
      survey.isKuwaitResidency ? t("yes") : t("no"),
      survey.nationality,
      survey.passportNumber,
      new Date(survey.passportExpires).toLocaleDateString(i18n.language),
      i18n.language == "en" ? survey.collegeNameEng : survey.collegeNameAr,
      i18n.language == "en" ? survey.courseNameEng : survey.courseNameAr,
      survey.personName,
      survey.telephone,
      survey.address,
      survey.email,
      survey.howDidYouFind,
      survey.nominatingInstitution,
      survey.directorName,
      survey.phoneNumber,
      survey.organizationEmail,
      survey.whoSupportsTheFamily,
      survey.doYouWork ? t("yes") : t("no"),
      survey.doYouVolunteer ? t("yes") : t("no"),
      survey.receiveGrant ? t("yes") : t("no"),
      survey.typeOfScholarship,
      new Date(survey.createdAt).toLocaleDateString(i18n.language),
      `${ClientUrl}/survey/${survey.id}`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const csvWithBOM = "\uFEFF" + csvContent;
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Scholarship_Forms.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authLoad) return <Spinner />;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="p-6">
          <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">{t("listFormSubmitted")}</h2>
            </div>
            <div className="flex justify-between py-2">
              <Link
                to="/admin/dashboard"
                className="text-black text-md px-4 py-2 rounded-lg flex items-center gap-5"
              >
                <FaArrowLeft />
                {t("back")}
              </Link>
              <button
                className="bg-gray-200 px-3 py-2 rounded-md"
                onClick={handleData}
              >
                {t("export")}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border-b">{t("referenceId")}</th>
                    <th className="py-2 px-4 border-b">{t("name")}</th>
                    <th className="py-2 px-4 border-b">{t("email")}</th>
                    <th className="py-2 px-4 border-b">{t("mobileNumber")}</th>
                    <th className="py-2 px-4 border-b">
                      {t("submissionDate")}
                    </th>
                    <th className="py-2 px-4 border-b">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr key={survey.id}>
                      <td className="py-2 px-4 border-b text-center">
                        {survey.referenceId}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {survey.firstName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {survey.email}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {survey.phoneNumber}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(survey.createdAt).toLocaleDateString(
                          i18n.language
                        )}
                      </td>
                      <td className="py-2 px-4 border-b flex gap-5 justify-center">
                        <Link
                          to={`/survey/${survey.id}`}
                          className="bg-green-700 text-white block px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          {t("details")}
                        </Link>
                        <button
                          onClick={() => deleteSurvey(survey.id)}
                          className="bg-red-700 text-white block px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ListFormSubmited;
