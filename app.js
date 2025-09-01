import express from "express";
import employeesRouter from "./api/employees.js";
const app = express();
export default app;

// Body parsing middleware for JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Mount the employees router at /employees
app.use("/employees", employeesRouter);
