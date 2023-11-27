const { Router } = require("express");
const { addBook, removeBook, getAllBooks, updateBook, getBook } = require("../controllers/book");
const router = Router();

router.post("/", addBook)

router.get("/", getAllBooks)

router.get("/:id", getBook)

router.put("/:ISBN", updateBook)

router.delete("/:ISBN", removeBook)


module.exports = router;