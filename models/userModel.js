// models/userModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY user_id ASC');
  return result.rows;
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
const createUser = async (user) => {
  const { name, email } = user;
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateUser = async (id, user) => {
  const { name, email } = user;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
