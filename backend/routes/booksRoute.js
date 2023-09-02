import express from "express";
import { Book } from "../models/bookModel.js";

const booksRouter = new express.Router();

// route to save a new book
booksRouter.post("/", async (req, res) => {
  console.log("POST for /books/ received");
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = new Book(newBook);
    await book.save();
    if (!book) {
      res.status(400).send({ message: "Error occurred when adding new book" });
    }
    res.send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to get all books from db
booksRouter.get("/", async (req, res) => {
  console.log("GET for /books/ received");
  try {
    const books = await Book.find({});
    res.json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to get a single book by it's id
booksRouter.get("/:id", async (req, res) => {
  console.log(`GET for books/:id received`);
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400).send({ message: "Error occurred looking for book" });
    }
    res.json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to update a book
booksRouter.put("/:id", async (req, res) => {
  console.log("PUT for books/:id received");
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(400).send({ message: "Error updating the book" });
    }
    res.send({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to delete a single book by it's id
booksRouter.delete("/:id", async (req, res) => {
  console.log("DELETE for /books/:id received.");
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found." });
    }
    res.send({ message: "Book deleted successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default booksRouter;
