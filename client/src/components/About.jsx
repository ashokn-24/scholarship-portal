import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="md:p-8 p-2 my-10 bg-white">
      <div className="container mx-auto text-center grid gap-5">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          {t("about_section_top")}
        </h2>

        <p className="text-gray-500 p-2 md:p-1 text-lg md:text-2xl">
          {t("about_section_tag")}
          {/* “Find Your Dream Scholarship: Your streamlined pathway to accessing
          the <br className="hidden md:block" /> perfect funding for your
          academic journey.” */}
        </p>

        <div className="grid grid-cols-1 p-2 md:p-5 md:grid-cols-2 gap-5 shadow-xl bg-green-700 rounded-lg">
          <div className="w-full md:p-6 p-1 rounded-lg space-y-4">
            <img
              className="rounded-xl w-full"
              src="https://scholarships.iico.org/wp-content/uploads/2024/02/College-of-Science-Faculty-Club.jpeg"
              alt="College of Science Faculty Club"
            />
          </div>

          <div className="flex flex-col gap-5 justify-start md:p-6  p-2 text-sm md:text-base">
            <p className="text-white text-justify">{t("about_description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
