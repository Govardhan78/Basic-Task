const express = require("express");
const router = express.Router();
const  protect  = require("../middleware/authMiddleware");
const { createTodo, getAllTodo, updateTodo, deleteTodo } = require("../controllers/todoController");

router.post("/create", protect,createTodo);
router.get("/get-all", protect, getAllTodo);
router.put("/update/:id",protect, updateTodo);
router.delete("/delete/:id", protect, deleteTodo);

module.exports = router;
