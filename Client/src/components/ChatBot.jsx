import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import "./ChatBot.css";
import { chatWithAI } from "../services/aiService";
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

const [messages, setMessages] = useState([
  {
    sender: "ai",
    text: "👋 Hi! I'm BookVerse AI. Ask me anything about books.",
  },
]);

const [loading, setLoading] = useState(false);

const sendMessage = async () => {

  if (!message.trim()) return;

  const userMessage = {
    sender: "user",
    text: message,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  const currentMessage = message;

  setMessage("");

  try {

    setLoading(true);

    const data = await chatWithAI(
      currentMessage
    );

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);

  }

  catch (error) {

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

      {msg.text}

    </div>

  ))}

  {loading && (

    <div className="ai-message">

      🤖 Thinking...

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
            />

            <button onClick={sendMessage}>

<Send size={18}/>

</button>

          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;