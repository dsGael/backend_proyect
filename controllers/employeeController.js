// controllers/EmployeeController.js
const Employee = require('../models/employeeModel');

// Obtener todos los empleados
const getEmployees = async (req, res) => {
  try {
    const Employees = await Employee.getAllEmployees();
    res.status(200).json(Employees);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los empleados', error: error.message });
  }
};

// Obtener un empleado por ID
const getEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const Employee = await Employee.getEmployeeById(id);
    if (!Employee) {
      return res.status(404).json({ message: `empleado con ID ${id} no encontrado` });
    }
    res.status(200).json(Employee);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
  }
};

// Crear un nuevo empleado
const createEmployee = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newEmployee = await Employee.createEmployee({ name, email });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el empleado', error: error.message });
  }
};

// Actualizar un empleado existente
const updateEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const existingEmployee = await Employee.getEmployeeById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: `empleado con ID ${id} no encontrado` });
    }
    const updatedEmployee = await Employee.updateEmployee(id, { name, email });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
  }
};

// Eliminar un empleado
const deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEmployee = await Employee.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: `empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: 'empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
