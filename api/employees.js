import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

// GET /employees
router.get("/", async (req, res, next) => {
  try {
    const all = await getAllEmployees();
    res.send(all);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).send("Request body required");
    }

    const required = ["name", "birthday", "salary"];
    for (const field of required) {
      if (!body[field]) {
        return res.status(400).send(`Missing required field: ${field}`);
      }
    }

    const newEmployee = await createEmployee(body);
    res.status(201).send(newEmployee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.send(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (!deleted) {
      return res.status(404).send("Employee not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).send("Request body required");
    }

    const required = ["name", "birthday", "salary"];
    for (const field of required) {
      if (!body[field]) {
        return res.status(400).send(`Missing required field: ${field}`);
      }
    }

    const updated = await updateEmployee(req.params.id, body);
    if (!updated) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});
