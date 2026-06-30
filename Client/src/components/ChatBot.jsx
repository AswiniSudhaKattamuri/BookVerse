import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import { chatWithAI } from "../services/aiService";
import { useAI } from "../context/AIContext";
// import AIBookCard from "./AIBookCard";/
import "./ChatBot.css";
import { useNavigate } from "react-router-dom";
import { useAIBooks } from "../context/AIBookContext";

function ChatBot() {
	const navigate = useNavigate();

const { setAiBooks } = useAIBooks();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(
    new Audio("/sound/ai-message.mp3")
  );

  const chatEndRef = useRef(null);

  const location = useLocation();

  const {
    messages,
    setMessages,
  } = useAI();

  const suggestions = [
    "💕 Romance",
    "💰 Finance",
    "🌱 Self Help",
    "👻 Horror",
    "🧙 Fantasy",
    "🕵️ Mystery",
    "📚 Thriller",
    "₹ Books under 500",
  ];

  const storedUser = localStorage.getItem("user");

  const user =
    storedUser &&
    storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;

useEffect(() => {

  if (location.pathname !== "/") return;

  if (location.state?.fromAIRecommendation) return;

  const timer = setTimeout(() => {
    setOpen(true);
  }, 1000);

  return () => clearTimeout(timer);

}, [location.pathname]);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

useEffect(() => {

  if (messages.length === 0) return;

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.sender === "ai") {

    

    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.4;

    audioRef.current.play()
      .then(() => console.log("Sound played"))
      .catch(err => console.log("Audio Error:", err));

  }

}, [messages]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    try {

      setLoading(true);

      const history = [
        ...messages,
        {
          sender: "user",
          text: currentMessage,
        },
      ].slice(-8);

      const data =
        await chatWithAI(history);
		
	
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
          books: data.books || [],
        },
      ]);

    }

    catch {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Something went wrong.",
        },
      ]);

    }

    finally {

      setLoading(false);

    }

  };

  const sendSuggestion = async (text) => {

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    try {

      setLoading(true);

      const history = [
        ...messages,
        {
          sender: "user",
          text,
        },
      ].slice(-8);

      const data =
        await chatWithAI(history);
	

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
          books: data.books || [],
        },
      ]);

    }

    catch {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Something went wrong.",
        },
      ]);

    }

    finally {

      setLoading(false);

    }

  };

  const handleSuggestion = (text) => {

    let cleaned = text;

    cleaned = cleaned.replace("💕 ", "");
    cleaned = cleaned.replace("💰 ", "");
    cleaned = cleaned.replace("🌱 ", "");
    cleaned = cleaned.replace("👻 ", "");
    cleaned = cleaned.replace("🧙 ", "");
    cleaned = cleaned.replace("🕵️ ", "");
    cleaned = cleaned.replace("📚 ", "");
    cleaned = cleaned.replace("₹ ", "");

    sendSuggestion(cleaned);

  };
    return (
    <>
      {!open && (
        <button
          className="chat-toggle"
          onClick={() => setOpen(true)}
        >
          <Bot size={30} />
        </button>
      )}

      {open && (
        <div className="chat-container">

          <div className="chat-header">

            <div>
              <h3>📚 BookVerse AI</h3>
              <span>Your Reading Companion</span>
            </div>

            <X
              size={22}
              className="close-btn"
              onClick={() => setOpen(false)}
            />

          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >

                {msg.sender === "ai" ? (
                  <>
                    <div className="avatar">
                      🤖
                    </div>

                    <div>

                      <div className="message-text">
                        {msg.text}
                      </div>

                      {msg.books?.length > 0 && (

  <button
    className="view-books-btn"
    onClick={() => {

      setAiBooks(msg.books);

      setOpen(false);

      navigate("/");

    }}
  >
    📚 View Recommended Books
  </button>

)}

                    </div>
                  </>
                ) : (
                  <>
                    <div className="message-text">
                      {msg.text}
                    </div>

                    <div className="user-avatar">
                      {(user?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  </>
                )}

              </div>

            ))}

            {loading && (

              <div className="ai-message">

                <div className="avatar">
                  🤖
                </div>

                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            )}

            <div ref={chatEndRef}></div>

            {messages.length === 1 && !loading && (

              <div className="suggestions">

                {suggestions.map((item) => (

                  <button
                    key={item}
                    onClick={() =>
                      handleSuggestion(item)
                    }
                  >
                    {item}
                  </button>

                ))}

              </div>

            )}

          </div>

          <div className="chat-footer">

            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              <Send size={18} />
            </button>

          </div>

        </div>
      )}

    </>
  );

}

export default ChatBot;