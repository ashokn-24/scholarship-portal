/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";

const UserSurvey = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { accessToken } = useUser();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/admin/survey/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSurvey(res.data);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, accessToken]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!survey)
    return (
      <p className="text-center block p-10 text-xl text-gray-500">
        No scholarship data found.
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("User Scholarship Details")}
      </h1>
      <h1 className="text-xl font-semibold mb-6 text-start p-6">
        {t("Reference ID")}: {survey.referenceId}
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-4">
            {[
              { label: t("ID"), value: survey.id },
              { label: t("First Name"), value: survey.firstName },
              { label: t("Surname"), value: survey.surName },
              { label: t("Family Name"), value: survey.familyName },
              { label: t("Birth Place"), value: survey.birthPlace },
              { label: t("Date of Birth"), value: survey.dob },
              { label: t("Marital Status"), value: survey.maritalStatus },
              { label: t("Gender"), value: survey.gender },
              {
                label: t("Kuwait Residency"),
                value: survey.isKuwaitResidency ? "Yes" : "No",
              },
              { label: t("Nationality"), value: survey.nationality },
              { label: t("Passport Number"), value: survey.passportNumber },
              {
                label: t("Passport Expires"),
                value: new Date(survey.passportExpires).toLocaleString(),
              },
              { label: t("College"), value: survey.college },
              { label: t("Course"), value: survey.course },
              { label: t("Person Name"), value: survey.personName },
              { label: t("Telephone"), value: survey.telephone },
              { label: t("Address"), value: survey.address },
              { label: t("Email"), value: survey.email },
              { label: t("How Did You Find Us"), value: survey.howDidYouFind },
              {
                label: t("Nominating Institution"),
                value: survey.nominatingInstitution,
              },
              { label: t("Director Name"), value: survey.directorName },
              { label: t("Phone Number"), value: survey.phoneNumber },
              {
                label: t("Organization Email"),
                value: survey.organizationEmail,
              },
              {
                label: t("Who Supports The Family"),
                value: survey.whoSupportsTheFamily,
              },
              {
                label: t("Do You Work"),
                value: survey.doYouWork ? "Yes" : "No",
              },
              {
                label: t("Do You Volunteer"),
                value: survey.doYouVolunteer ? "Yes" : "No",
              },
              {
                label: t("Receive Grant"),
                value: survey.receiveGrant ? "Yes" : "No",
              },
              {
                label: t("Type Of Scholarship"),
                value: survey.typeOfScholarship,
              },
            ].map((item, index) => (
              <div key={index} className="flex p-2 justify-between">
                <span className="font-semibold">{item.label}:</span>
                <span>{item.value || "N/A"}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[
              { label: t("Birth Certificate"), value: survey.birthFile },
              { label: t("Photo"), value: survey.photoFile },
              { label: t("Diploma Certificate"), value: survey.diplomaFile },
              { label: t("Grades Certificate"), value: survey.gradesFile },
              { label: t("Passport"), value: survey.passportFile },
              {
                label: t("Passport Validation File"),
                value: survey.passportValidFile,
              },
              {
                label: t("Health Check Certificate"),
                value: survey.healthFile,
              },
              {
                label: t("Arabic Language Certificate"),
                value: survey.arabLangFile,
              },
              {
                label: t("Criminal Status Certificate"),
                value: survey.criminalStatusFile,
              },
              {
                label: t("Recommendations Certificate"),
                value: survey.recommendationFile,
              },
              {
                label: t("Apptitude Test Completion File"),
                value: survey.testCompletionFile,
              },
              { label: t("Sequence Certificate"), value: survey.sequenceFile },
              {
                label: t("Kuwait Education Certificate"),
                value: survey.kuwaitEduFile,
              },
            ].map((file, index) => (
              <div
                key={index}
                className="flex justify-between p-2 items-center"
              >
                <span className="font-semibold">{file.label}:</span>
                {file.value ? (
                  <a
                    href={file.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <img
                      src="https://icon-library.com/images/file-icon/file-icon-28.jpg"
                      alt={`${file.label} Icon`}
                      width={50}
                      height={50}
                    />
                    <span className="text-blue-500 underline">View File</span>
                  </a>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSurvey;
