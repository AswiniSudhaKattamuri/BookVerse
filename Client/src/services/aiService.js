import api from "./api";

export const chatWithAI = async (messages) => {

  const response = await api.post("/ai", {
    messages,
  });

  return response.data;

};