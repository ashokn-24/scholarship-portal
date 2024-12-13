/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import {
  MicrosoftLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const { setUser, user, setAccessToken } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    if (!location.search) return;
    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.get("success")) {
      alert("try agian later");
      return;
    }

    const accessToken = searchParams.get("accessToken");
    setAccessToken(accessToken);
    navigate("/");
  }, [location, setAccessToken, navigate]);

  const handleLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  const { t } = useTranslation();

  return (
    <div>
      <div id="login-page" className="font-mono bg">
        <div className="p-5">
          <button
            className="flex items-center gap-1 text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            <FaArrowLeft height="16px" width="16px" />
            <span className="text-[16px]">{t("signin_back_to_home")}</span>
          </button>
        </div>
        <div className="flex items-center flex-col justify-center min-h-screen">
          <div
            id="login-card"
            className="flex flex-col space-y-4 p-10  rounded-md bg-zinc-300 shadow-xl border-zinc-500 mx-12 w-[340px] h-[450px]"
          >
            <div className="flex justify-center mb-1">
              <img
                src="https://scholarships.iico.org/wp-content/uploads/2024/01/logo.png"
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-center p-2 sm:text-base text-white text-[20px] font-bold md:text-[30px]">
              {t("signin")}
            </h1>
            <div id="google-btn" className="text-center my-5 py-5">
              <GoogleLoginButton onClick={() => handleLogin("google")}>
                <span className="text-base p-2">{t("signin_google")}</span>
              </GoogleLoginButton>
            </div>
            <div id="microsoft-btn" className=" my-5 py-5 ">
              <MicrosoftLoginButton onClick={() => handleLogin("microsoft")}>
                <span className="text-base text-right p-2">
                  {t("signin_microsoft")}
                </span>
              </MicrosoftLoginButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
