/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Features() {
  const { t } = useTranslation();
  return (
    <section id="scholarships" className="md:p-8 p-2 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-700 p-2">
          {t("scholarships_section_top")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-2xl bg-white rounded-lg overflow-hidden m-4 md:m-20">
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover rounded-none"
              src="https://scholarships.iico.org/wp-content/uploads/2024/02/iico-kuwait.jpg"
              alt="Scholarship Image"
            />
          </div>

          <div className="flex flex-col gap-5 justify-start p-6">
            <h1 className="md:text-xl text-lg text-gray-700 font-semibold mb-2 text-start">
              {t("scholarship_heading")}
            </h1>
            <p className="text-gray-900 text-justify text-sm md:text-base">
              {t("scholarship_description")}
            </p>
            <div className="flex justify-start">
              <Link
                to="scholarships"
                className="text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-800"
              >
                {t("scholarships_apply")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
