// models/userModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllEmployees = async () => {

  const result = await pool.query('SELECT * FROM employees ORDER BY employee_id ASC');
  return result.rows;
};

// Obtener un usuario por ID
const getEmployeeById = async (id) => {
  const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
const createEmployee = async (employee) => {
  const { name, email } = user;
  const result = await pool.query(
    'INSERT INTO employees (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateEmployee = async (id, employee) => {
  const { name, email } = user;
  const result = await pool.query(
    'UPDATE employees SET name = $1, email = $2 WHERE employee_id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteEmployee = async (id) => {
  const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};