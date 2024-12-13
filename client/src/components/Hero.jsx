/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import HeroImg from "/hero-banner.jpeg";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 md:p-8 text-center">
      <div className="container flex flex-col justify-center gap-10 items-center mx-auto p-3">
        <h1 className="text-gray-700 text-[28px] md:text-[38px] font-bold w-full text-start">
          {t("welcome_message")}
        </h1>
        <p className="text-gray-500 text-justify text-sm md:text-base">
          {t("tagline")}
        </p>
        <div className="w-full flex items-start">
          <button className="text-white bg-green-700 px-3 py-2 rounded-md hover:bg-green-800">
            {t("learn_more")}
          </button>
        </div>
      </div>
      <div>
        <img className="rounded-2xl px-3" src={HeroImg} alt="Scholarship" />
      </div>
    </section>
  );
}

export default Hero;
