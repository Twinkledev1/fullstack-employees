import express from "express";
import { getEmployees , createEmployee } from "../db/queries/employees.js";

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
employeesRouter.post("/", (req, res) => {

    const name = req.body.name ;
    const birthday = req.body.birthday ;
    const salary = req.body.salary ;

  // Check if request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Request body is required");
  }

  // Check if name is provided and not empty
  if (!name|| name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  // Check if birthday is provided and not empty
  if (!birthday || birthday.trim() === "") {
    return res.status(400).send("Birthday is required");
  }

  // Check if salary is provided and not empty
  if (!salary|| salary.trim() === "") {
    return res.status(400).send("Salary is required");
  }


  const employees = await createEmployee(name, birthday , salary); // wait for DB

  // Return the new employee with status 201
  res.status(201).json(newEmployee);
});
