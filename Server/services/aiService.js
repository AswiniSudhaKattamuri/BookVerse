const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askAI = async (messages, books) => {

  const latestMessage =
    messages[messages.length - 1].text;

  const text = latestMessage.toLowerCase().trim();

  if (
    text.startsWith("hi") ||
    text.startsWith("hello") ||
    text.startsWith("hey") ||
    text.startsWith("good morning") ||
    text.startsWith("good afternoon") ||
    text.startsWith("good evening")
  ) {

    return `👋 Welcome Reader!

I'm BookVerse AI 📚

I can help you find books, recommend books based on your interests, and answer questions about our collection.

What kind of books are you interested in today?`;

  }

  const systemPrompt = `
You are BookVerse AI, an intelligent bookstore assistant.

IMPORTANT RULES:

- Remember the previous conversation.
- Answer based on the conversation history.
- If the user says "more emotional", "another one", "cheaper", "something similar", understand the previous context.
- Recommend books ONLY from the available books below.
- Never invent books.
- If no matching books exist, politely say so.
- Keep your replies short (2-4 sentences).
- Be friendly and conversational.

VERY IMPORTANT:

- DO NOT list book titles.
- DO NOT list authors.
- DO NOT list prices.
- DO NOT number the books.
- DO NOT describe every recommended book.
- The frontend will automatically display the recommended books as beautiful cards.
- Simply introduce the recommendations.

Examples:

"📚 I found a few books that match your interests. Check them out below."

"I found some great books within your budget. Take a look below."

"I think these books would be perfect for you. Here are my recommendations."

Available Books:

${books}
`;

  const history = messages.map((msg) => ({
    role:
      msg.sender === "ai"
        ? "assistant"
        : "user",
    content: msg.text,
  }));

  const completion =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...history,
      ],

    });

  return completion.choices[0].message.content;

};

module.exports = {
  askAI,
};