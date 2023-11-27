const { Router } = require("express");
const {
  borrowBook,
  getBorrowedBook,
  returnBorrowedBook,
} = require("../controllers/borrow");
const { authMiddleware } = require("../middleware");
const router = Router();

// Route for the borrowing books
router.post("/:id", authMiddleware, borrowBook);

// route for fetting the borrowed books
router.get("/", authMiddleware, getBorrowedBook);

// Route for returning the borrowed book
router.put("/return-book/:id", authMiddleware, returnBorrowedBook);

module.exports = router;
