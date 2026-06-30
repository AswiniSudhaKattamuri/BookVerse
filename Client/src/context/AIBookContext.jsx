import { createContext, useContext, useState } from "react";

const AIBookContext = createContext();

export const AIBookProvider = ({ children }) => {

  const [aiBooks, setAiBooks] = useState([]);

  return (
    <AIBookContext.Provider
      value={{
        aiBooks,
        setAiBooks,
      }}
    >
      {children}
    </AIBookContext.Provider>
  );
};

export const useAIBooks = () => useContext(AIBookContext);