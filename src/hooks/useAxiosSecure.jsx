import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  // for prod https://house-hunter-server-api.vercel.app and for dev http://localhost:5000
  baseURL: "https://house-hunter-server-api.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  // request interceptor to add authorization header for every secure call to fetch api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts for 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
