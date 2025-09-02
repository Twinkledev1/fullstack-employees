import express from "express";
import { getEmployees, createEmployee , getEmployeesId} from "../db/queries/employees.js";

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
    const name = req.body.name;
    const birthday = req.body.birthday;
    const salary = Number(req.body.salary);

    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }

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
    res.status(500).json({ error: "Internal server error" });
  }
});

- `GET /employees/:id`

employeesRouter.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id , 10);

        // Check if provided id is not a positive integer
        if (!id || id <= 0) {
          return res.status(400).send("Employee id must be a positive integer");
        }

       // Fetch employee from DB

        const employee = await getEmployeesId(id); 
     
        // Check if employee  exist
        if (!id || id === 0) {
          return res.status(404).send(" Employee does not exist")
        }
    
        // Return the new employee 
        res.json(employee);
      } 
      
      catch (err) {
        console.error("Error get employee:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

 `DELETE /employees/:id`

employeesRouter.delete("/:id", async (req,res) => {
    try {
        const id = parseInt(req.params.id , 10);

         // Check if provided id is not a positive integer
         if (!id || id <= 0) {
            return res.status(400).send("Employee id must be a positive integer");
          }
           // Fetch employee from DB

        const employee = await deleteEmployee(id); 
        // Check if employee  exist
        if (!id || id === 0) {
            return res.status(404).send(" Employee does not exist")
          }

           // delete the new employee with status 204
        res.status(204).json(employee);
    } 
        
     catch (error) {
        console.error("Error get employee:", err);
        res.json({ error: "Internal server error" })
    }
})