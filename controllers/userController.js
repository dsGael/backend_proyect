// controllers/userController.js
const User = require('../models/userModel');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

// Actualizar un usuario existente
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const existingUser = await User.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
    }
    const updatedUser = await User.updateUser(id, { name, email });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
