const { createUser, getUserByClerkId, deleteUserByClerkId } = require("../models/userModel");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) {
    return res.status(400).json({ error: "Clerk ID обязателен" });
  }

  try {
    const user = await getUserByClerkId(clerkId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) {
    return res.status(400).json({ error: "Clerk ID обязателен" });
  }

  try {
    const result = await deleteUserByClerkId(clerkId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  getUser,
  deleteUser,
};
