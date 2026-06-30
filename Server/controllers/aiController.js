const Book = require("../models/Book");
const { askAI } = require("../services/aiService");

const chatWithAI = async (req, res) => {
  try {

    const { messages } = req.body;

    const message =
      messages[messages.length - 1].text;

    const messageLower = message.toLowerCase();

    let query = {};

    const categories = [
      "romance",
      "romantic thriller",
      "thriller",
      "mystery",
      "horror",
      "fantasy",
      "science fiction",
      "selfhelp",
      "business",
      "finance",
      "biography",
      "classic",
    ];

    const matchedCategory = categories.find((category) =>
      messageLower.includes(category)
    );

    if (matchedCategory) {
      query.category = new RegExp(
        `^${matchedCategory}$`,
        "i"
      );
    }

    const budget = message.match(/\d+/);

    if (budget) {
      query.price = {
        $lte: Number(budget[0]),
      };
    }

    const books = await Book.find(query).limit(3);

    if (books.length === 0) {
      return res.json({
        reply:
          "😔 Sorry! I couldn't find any books matching your request in BookVerse. Try another category or budget.",
      });
    }

    const formattedBooks = books
      .map(
        (book) => `
Title: ${book.title}
Author: ${book.author}
Category: ${book.category}
Price: ₹${book.price}
Description: ${book.description}
Stock: ${book.stock}
`
      )
      .join("\n");

    const reply = await askAI(
  messages,
  formattedBooks
);

res.json({
  reply,
  books,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Error",
    });

  }
};

module.exports = {
  chatWithAI,
};