import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../db/queries/employees.js";

const employeesRouter = express.Router();
export default employeesRouter;

// GET /employees - returns all employees
employeesRouter.get("/", async (req, res) => {
  try {
    console.log("Get Employee");
    const employees = await getEmployees(); // wait for DB
    console.log("Employees:", employees); // log real data
    res.json(employees); // send as JSON
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /employees - creates a new employee
employeesRouter.post("/", async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }

    const name = req.body.name;
    const birthday = req.body.birthday;
    const salary = Number(req.body.salary);

    // Check if name is provided and not empty
    if (!name || name.trim() === "") {
      return res.status(400).send("Name is required");
    }

    // Check if birthday is provided and not empty
    if (!birthday || birthday.trim() === "") {
      return res.status(400).send("Birthday is required");
    }

    // Check if salary is provided and not empty
    if (!salary || salary <= 0) {
      return res.status(400).send("Salary is required");
    }

    const employees = await createEmployee({ name, birthday, salary }); // wait for DB

    // Return the new employee with status 201
    res.status(201).json(employees);
  } catch (err) {
    console.error("Error creating employees:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

-`GET /employees/:id`;

employeesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // check if id is a valid positive integer
    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Employee!!!! id must be a positive integer");
    }

    // Fetch employee from DB

    const employee = await getEmployee(id);

    // Check if employee  exist
    if (!employee) {
      return res.status(404).send(" Employee does not exist");
    }

    // Return the new employee
    res.json(employee);
  } catch (err) {
    console.error("Error get employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

`DELETE /employees/:id`;

employeesRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if provided id is not a positive integer
    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Employee!!!! id must be a positive integer");
    }

    // Check if employee  exist
    if (!id) {
      return res.status(404).send(" Employee does not exist");
    }

    // Fetch employee from DB
    const employee = await deleteEmployee(id);

    //   Employee not found
    if (!employee) {
      return res.status(404).send("Employee does not exist");
    }

    // delete employee with status 204
    res.status(204).send();
  } catch (error) {
    console.error("Error get employee:", error);
    res.json({ error: "Internal server error" });
  }
});

// - `PUT /employees/:id`

employeesRouter.put("/:id", async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }
    const name = req.body.name;
    const birthday = req.body.birthday;
    const salary = Number(req.body.salary);
    const { id } = req.params;

    // Check if name is provided and not empty
    if (!name || name.trim() === "") {
      return res.status(400).send("Name is required");
    }

    // Check if birthday is provided and not empty
    if (!birthday || birthday.trim() === "") {
      return res.status(400).send("Birthday is required");
    }

    // Check if salary is provided and not empty
    if (!salary || salary <= 0) {
      return res.status(400).send("Salary is required");
    }
    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Employee!!!! id must be a positive integer");
    }
    const employee = await updateEmployee({ id, name, birthday, salary }); // wait for DB
    console.log("update employee - ", employee);
    if (!employee) {
      return res.status(404).send("employee does not exist");
    }

    // Return the updated employee with status 200
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error updating employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
