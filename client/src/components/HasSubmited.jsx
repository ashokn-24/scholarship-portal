import { useTranslation } from "react-i18next";

const HasSubmited = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-4 text-center bg-gray-100 rounded-md md:p-6 lg:p-8">
      <div className="flex items-center justify-center py-10">
        <img src="./error.svg" alt="Error" />
      </div>
      <p className="text-sm text-gray-700 md:text-base lg:text-lg">
        {t("has_submitted")}
      </p>
    </div>
  );
};

export default HasSubmited;
