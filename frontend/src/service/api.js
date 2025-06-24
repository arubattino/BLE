import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export const fetchDevices = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/scan`);
  return data;
};