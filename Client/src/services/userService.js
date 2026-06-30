import axios from "axios";

const API = "http://localhost:5000/api/users";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = async () => {
  const response = await axios.get(
    `${API}/profile`,
    authHeader()
  );

  return response.data;
};

export const updateProfile = async (user) => {
  const response = await axios.put(
    `${API}/profile`,
    user,
    authHeader()
  );

  return response.data;
};