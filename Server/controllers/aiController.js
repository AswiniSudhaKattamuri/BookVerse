const Book = require("../models/Book");
const { askAI } = require("../services/aiService");

const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    const message =
      messages[messages.length - 1].text;

    const text = message.toLowerCase().trim();

    let query = {};


    // LANGUAGE

    if (
      text.includes("telugu") ||
      message.includes("తెలుగు")
    ) {
      query.language = {
        $regex: "^Telugu$",
        $options: "i",
      };
    }

    if (text.includes("english")) {
      query.language = {
        $regex: "^English$",
        $options: "i",
      };
    }


    // CATEGORY

    const categories = [
      "romantic thriller",
      "science fiction",
      "self help",
      "romance",
      "thriller",
      "mystery",
      "horror",
      "fantasy",
      "business",
      "finance",
      "biography",
      "classic",
      "spiritual",
      "stories",
      "children",
      "humor",
      "poetry",
      "fiction",
      "dystopian",
    ];

    const matchedCategory = categories.find(
      (category) => text.includes(category)
    );

    if (matchedCategory) {
      query.category = {
        $regex: `^${matchedCategory}$`,
        $options: "i",
      };
    }


    // PRICE

    const priceMatch = text.match(
      /(?:under|below|less than|within)\s*(?:₹|rs\.?|rupees?)?\s*(\d+)/i
    );

    if (priceMatch) {
      query.price = {
        $lte: Number(priceMatch[1]),
      };
    }


    console.log("USER:", message);
    console.log("QUERY:", query);


    console.log("MESSAGE RECEIVED:", message);
console.log("QUERY CREATED:", query);

const books = await Book.find(query).limit(3);

console.log(
  "BOOKS RETURNED:",
  books.map((book) => ({
    title: book.title,
    language: book.language,
    category: book.category,
    price: book.price,
  }))
);


    console.log(
      "RESULT:",
      books.map((book) => ({
        title: book.title,
        language: book.language,
        category: book.category,
        price: book.price,
      }))
    );


    if (books.length === 0) {
      return res.json({
        reply:
          "😔 I couldn't find matching books in our collection. Try another language, category, or budget.",
        books: [],
      });
    }


    const formattedBooks = books
      .map(
        (book) => `
Title: ${book.title}
Author: ${book.author}
Category: ${book.category}
Language: ${book.language}
Price: ₹${book.price}
Description: ${book.description}
`
      )
      .join("\n");


    const reply = await askAI(
      messages,
      formattedBooks
    );


    return res.json({
      reply,
      books,
    });

  } catch (error) {
    console.log("AI ERROR:", error);

    return res.status(500).json({
      message: "AI Error",
    });
  }
};


module.exports = {
  chatWithAI,
};