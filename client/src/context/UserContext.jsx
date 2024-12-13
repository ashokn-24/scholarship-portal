/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserProfile = async (token) => {
      try {
        const response = await axios.get(`/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const getInitialAuth = async () => {
      try {
        const res = await axios.post(
          `/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        setAccessToken(res.data.accessToken);
      } catch (err) {
        console.log("Error refreshing token:", err);
      } finally {
        setLoading(false);
      }
    };

    getInitialAuth();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
