import api from "./api";

export const getAllBooks = async (filters = {}) => {

  const response = await api.get("/books", {
    params: filters,
  });

  return response.data;

};