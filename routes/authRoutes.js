const express = require("express");
const { body } = require("express-validator");
const { registerUser, getUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Имя обязательно"),
    body("email").isEmail().withMessage("Некорректный email"),
    body("clerkId").trim().notEmpty().withMessage("Clerk ID обязателен"),
    body("gender").isIn(["male", "female"]).withMessage("Неверный пол"),
    body("birthDate").isISO8601().withMessage("Дата рождения должна быть в формате YYYY-MM-DD"),
  ],
  registerUser
);

router.get("/user", getUser);

router.delete("/user", deleteUser);

module.exports = router;
