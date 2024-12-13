import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Nav = () => {
  const { user, setUser, setAccessToken, loading } = useUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/auth/logout`, { withCredentials: true });
      setUser(null);
      setAccessToken(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div> </div>; // or a loading spinner if preferred

  return (
    <nav className="bg-white text-[#666666]">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex gap-5 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src="https://scholarships.iico.org/wp-content/uploads/2024/01/logo.png"
              alt="Logo"
              className="object-contain w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
            />
          </Link>

          {/* User Profile Section Mobile */}
          {user && (
            <div className="relative md:hidden flex items-center">
              <img
                src="/ac_white.svg"
                onClick={toggleDropdown}
                className="cursor-pointer w-9 xl:w-11"
                alt="Profile"
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 w-48 md:w-58 bg-white rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none"
                  style={{ maxWidth: "95vw" }}
                >
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {user.fullName}
                  </span>
                  <Link
                    to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#666666] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen
              ? "fixed inset-0 bg-white z-50 flex flex-col items-start p-4 backdrop-blur-md bg-opacity-90"
              : "hidden"
          } md:static md:flex md:flex-row md:gap-4 md:items-center md:w-auto`}
        >
          <button onClick={closeMenu} className="self-end mb-4 md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <Link
            to="/"
            className="text-[#666666] p-2 text-[19px] hover:bg-gray-200"
            onClick={closeMenu}
          >
            {t("nav_home")}
          </Link>
          <a
            href="#scholarships"
            className="text-[#666666] p-2 text-[19px] hover:bg-gray-200"
            onClick={closeMenu}
          >
            {t("nav_scholarships")}
          </a>
          <a
            href="#about"
            className="text-[#666666] p-2 text-[19px] hover:bg-gray-200"
            onClick={closeMenu}
          >
            {t("nav_about")}
          </a>
          <Link
            to="/contact-us"
            className="text-[#666666] p-2 text-[19px] hover:bg-gray-200"
            onClick={closeMenu}
          >
            {t("nav_contact")}
          </Link>

          {/* Register and Sign In */}
          {!user && (
            <Link
              to="/sign-in"
              className="text-white bg-green-700 px-3 py-2 rounded-md mt-4 md:mt-0"
              onClick={closeMenu}
            >
              {t("nav_signin")}
            </Link>
          )}

          {user && (
            <div className="relative hidden md:block">
              <img
                src="/ac_white.svg"
                onClick={toggleDropdown}
                className="cursor-pointer w-9 xl:w-11"
                alt="Profile"
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 w-48 md:w-58 bg-white rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none"
                  style={{ maxWidth: "95vw" }}
                >
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {user.fullName}
                  </span>
                  <Link
                    to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="block md:hidden">
            <div className="mt-4 md:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="hidden md:block">
          <div className="mt-4 md:mt-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
