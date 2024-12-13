/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSwitch = (lng) => {
    setSelectedLanguage(lng);
    changeLanguage(lng === "AR" ? "ar" : "en");
  };

  const [selectedLanguage, setSelectedLanguage] = useState("AR");

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, selectedLanguage, i18n]);

  return (
    <div>
      <div className="inline-flex items-center border rounded-full overflow-hidden">
        <button
          className={`px-4 py-2 w-16 transition-colors duration-300 ease-in-out ${
            selectedLanguage === "AR"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleSwitch("AR")}
        >
          AR
        </button>
        <button
          className={`px-4 py-2 w-16 transition-colors duration-300 ease-in-out ${
            selectedLanguage === "ENG"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleSwitch("ENG")}
        >
          ENG
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
