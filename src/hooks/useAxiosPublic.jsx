import axios from "axios";

const axiosPublic = axios.create({
  // for prod https://house-hunter-server-api.vercel.app and for dev http://localhost:5000
  baseURL: "https://house-hunter-server-api.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
