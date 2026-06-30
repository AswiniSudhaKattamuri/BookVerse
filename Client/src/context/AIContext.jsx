import { createContext, useContext, useState } from "react";

const AIContext = createContext();

const storedUser = localStorage.getItem("user");

const user =
  storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null;

const initialMessages = [
  {
    sender: "ai",
    text: `👋 Welcome ${user?.name || "Reader"}!

I'm BookVerse AI 📚

I can help you find books, recommend books based on your interests, and answer questions about our collection.

Try asking me:
📚 Finance books under ₹500
💕 Romance novels
👻 Horror books
🌱 Self-help books`,
  },
];

export const AIProvider = ({ children }) => {

  const [messages, setMessages] = useState(initialMessages);

  const clearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        setMessages,
        clearChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);