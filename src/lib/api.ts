export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
