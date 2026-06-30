const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askAI = async (message, books) => {

  const prompt = `
You are BookVerse AI.

Recommend books ONLY from the list below.

Never recommend books outside this list.

Available Books:

${books}

User Question:

${message}

Reply in a friendly format.

Mention title, author, price and why you recommend it.

`;

  const completion =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

    });

  return completion.choices[0].message.content;

};

module.exports = {
  askAI,
};