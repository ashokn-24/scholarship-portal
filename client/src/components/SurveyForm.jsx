/* eslint-disable no-unused-vars */
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "../index.css";
import jsonForm from "../ScholarshipJSON.json";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import HasSubmited from "./HasSubmited";
import { useNavigate } from "react-router-dom";

const collegeSection = jsonForm.pages[1].elements[1];

const SurveyForm = () => {
  const { accessToken } = useUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [surveyJson, setSurveyJson] = useState(jsonForm);
  const BASE_URL = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchClg = async () => {
      try {
        const res = await axios.get(`/api/data/colleges`);
        const collegeData = res.data;

        const courseRes = await axios.get(`/api/data/courses`);
        const courseData = courseRes.data;

        const courseChoices = courseData.map((choice) => ({
          value: choice.id,
          text: i18n.language === "ar" ? choice.ar : choice.default,
          visibleIf: `{college} = ${choice.value}`,
        }));

        const clgChoices = collegeData.map((choice) => ({
          value: choice.value,
          text: i18n.language === "ar" ? choice.ar : choice.defaultValue,
        }));

        setSurveyJson((prev) => {
          const updatedJson = { ...prev };
          updatedJson.pages[1].elements[0].choices = clgChoices;
          updatedJson.pages[1].elements[1].choices = courseChoices;
          console.log("Updated Survey JSON", updatedJson);
          return updatedJson;
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchClg();
  }, [i18n.language]); // Add i18n.language as a dependency

  const survey = new Model(surveyJson);
  survey.locale = i18n.language;

  survey.onComplete.add(async (sender) => {
    console.log(sender.data);
    try {
      const response = await axios.post(
        `/api/data/survey-results`,
        sender.data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.hasSubmitted) {
        setHasSubmitted(true);
        return;
      }

      if (response.status === 201) {
        console.log("Survey results saved successfully:", response.data);
      }
    } catch (err) {
      navigate("/error", { state: { error: err.message } });
      console.error("Error saving survey results:", err);
    }
  });

  if (hasSubmitted) {
    return <HasSubmited />;
  }

  return <Survey model={survey} />;
};

export default SurveyForm;
