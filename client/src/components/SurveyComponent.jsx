import { useEffect } from "react";
import SurveyForm from "./SurveyForm";
const SurveyComponent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <SurveyForm />
    </div>
  );
};

export default SurveyComponent;
