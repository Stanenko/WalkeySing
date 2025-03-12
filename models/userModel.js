const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

const sql = neon(process.env.DATABASE_URL);

const createUser = async ({ name, email, clerkId, gender, birthDate, image }) => {
  try {
    await sql`
      INSERT INTO users (name, email, clerk_id, gender, birth_date, image)
      VALUES (${name}, ${email}, ${clerkId}, ${gender}, ${birthDate}, ${image || null})
      ON CONFLICT (clerk_id) DO NOTHING;
    `;
    return { success: true };
  } catch (error) {
    throw new Error("Ошибка регистрации пользователя: " + error.message);
  }
};

const getUserByClerkId = async (clerkId) => {
  try {
    const user = await sql`
      SELECT name, email, gender, birth_date, image 
      FROM users 
      WHERE clerk_id = ${clerkId};
    `;
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    throw new Error("Ошибка получения пользователя: " + error.message);
  }
};

const deleteUserByClerkId = async (clerkId) => {
  try {
    await sql`
      DELETE FROM users WHERE clerk_id = ${clerkId};
    `;
    return { message: "Аккаунт успешно удален" };
  } catch (error) {
    throw new Error("Ошибка удаления пользователя: " + error.message);
  }
};

module.exports = {
  createUser,
  getUserByClerkId,
  deleteUserByClerkId,
};
