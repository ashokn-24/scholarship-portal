/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-200 text-[#666666] flex ">
      <div className="container mx-auto grid grid-cols-2 md:flex md:flex-row md:justify-evenly md:items-start p-4 md:p-10">
        {/* Logo */}
        <div className="flex flex-col col-span-2 items-center md:items-start mb-4 md:mb-0">
          <Link to="/" className="flex items-center m-2">
            <img
              src="https://scholarships.iico.org/wp-content/uploads/2024/01/logo.png"
              alt="Logo"
              className="object-contain w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
            />
          </Link>
          <p className="text-center md:text-left p-3">{t("footer_message")}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col  md:flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-base md:text-xl font-bold p-2">
            {t("footer_company")}
          </div>
          <a
            href="#scholarships"
            className="text-[#666666] p-2 text-sm md:text-xl w-fit"
          >
            {t("footer_scholarsships")}
          </a>
          <a href="#about" className="text-[#666666] p-2 text-sm md:text-xl">
            {t("footer_about")}
          </a>
          <Link
            to="/contact-us"
            className="text-[#666666] p-2 text-sm md:text-xl w-fit"
          >
            {t("footer_contact")}
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-col items-center md:items-start">
          <h1 className="text-base md:text-xl font-bold p-2">
            {t("footer_follow")}
          </h1>
          <Link
            to="https://www.facebook.com/khayriyanet/"
            className="text-[#666666] p-2"
          >
            <img
              src="/facebook.svg"
              className="w-[38px] h-[38px] md:w-[48px] md:h-[48px]"
              alt="Facebook"
            />
          </Link>
          <Link
            to="https://www.youtube.com/user/IICOKUWAIT"
            className="text-[#666666] p-2 w-fit"
          >
            <img
              src="/youtube.svg"
              className="w-[38px] h-[38px] md:w-[48px] md:h-[48px]"
              alt="YouTube"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-base md:text-xl font-bold p-2">Support</h1>
          <p className="p-2">{t("footer_support")}</p>
          <div className="p-2">
            <span className="block">
              {t("email")}:{" "}
              <a href="mailto:scholarship@iico.org" className="text-blue-500">
                scholarship@iico.org
              </a>
            </span>
            <span className="block">
              {t("mobileNumber")}:{" "}
              <a href="tel:+9651808300" className="text-blue-500">
                +9651808300
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
