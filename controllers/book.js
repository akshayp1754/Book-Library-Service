const { Book } = require("../schema/book");

module.exports.addBook = async (req, res) => {
  try {
    const addNewBook = await Book.create(req.body);
    if (!title || !author || !genre) {
        return res.status(400).json({ error: 'Incomplete data' });
      }
    return res.status(201).json({
      message: "Book added successfully",
      success: true,
      data: addNewBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json({
      message: "Books fetched successfully",
      success: true,
      data: allBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports.getBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json({
        message: "Books fetched successfully",
        success: true,
        data: book,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  };

module.exports.updateBook = async (req, res) => {
  try {
    const { ISBN } = req.params;
    const updateBook = await Book.findOneAndUpdate({ ISBN }, req.body, {
      new: true,
    });

    if (!updateBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updateBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports.removeBook = async (req, res) => {
  try {
    const { ISBN } = req.params;
    const removeBook = await Book.findOneAndDelete({ ISBN });

    if (!removeBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book removed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
