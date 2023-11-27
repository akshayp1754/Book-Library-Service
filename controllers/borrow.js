const { Book } = require("../schema/book");
const { BorrowBook } = require("../schema/borrowing");
const { User } = require("../schema/user");


//API Methods for borrowing book
module.exports.borrowBook = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const bookId = req.params.id;

    // Check if user and book exist
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found." });
    }

    const borrowNewBook = await BorrowBook.create({
      user: userId,
      book: bookId,
      ...req.body,
    });

    return res.status(201).json({
      message: "Borrowing entry created successfully",
      success: true,
      data: borrowNewBook,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

//API Methods for getting all borroed books 
module.exports.getBorrowedBook = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Find borrowed books for the specified user
    const borrowedBooks = await BorrowBook.find({ user: userId })
      .populate("book") // Populate the book details from Book model
      .exec();

    return res.status(200).json({
      success: true,
      data: borrowedBooks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};


// PUT API to mark a borrowed book as returned
module.exports.returnBorrowedBook = async (req, res) => {
  try {
    const { id: userId } = req.user; 
    console.log(userId);
    const bookId = req.params.id; 
    console.log(bookId);
    // Find the borrowed book associated with the user and book ID
    const borrowedBook = await BorrowBook.findOneAndUpdate({ user: userId, book: bookId });
    console.log(borrowedBook);

    if (!borrowedBook) {
      return res.status(404).json({ message: 'Borrowed book not found for this user and book.' });
    }

    // Update the return_date field to mark the book as returned
    borrowedBook.return_date = new Date();
    await borrowedBook.save();

    return res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      data: borrowedBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false, data: null });
  }
};

