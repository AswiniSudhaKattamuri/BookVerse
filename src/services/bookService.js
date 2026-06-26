import api from "./api";

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const searchBooks = async (title) => {
  const response = await api.get(
    `/books/search/title?title=${title}`
  );
  return response.data;
};