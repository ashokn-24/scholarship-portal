/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { error } = location.state || { error: "Unknown error" };
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex  justify-center bg-white p-6">
      <div className="rounded-lg p-8 mt-16">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          {t("error_page_title")}
        </h1>
        <p className="text-gray-700 mb-6">{t("error_page_message")}</p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-auto mb-4">
          {error}
        </pre>
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-block bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-500"
          >
            {t("error_page_navigation")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
