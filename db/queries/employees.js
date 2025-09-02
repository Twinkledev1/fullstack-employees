import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const sql = `
  insert into employees(name, birthday, salary)
  values($1,$2,$3)
  returning * `;
    const values = [name, birthday, salary];

    const res = await db.query(sql, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating employee", error);
    throw error;
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const sql = `select * from employees; `;
    const res = await db.query(sql);
    console.log("Result -", res.rows); // ✅ prints array of objects
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  try {
    const sql = `SELECT * FROM employees WHERE id = $1;`;
    const result = await db.query(sql, [id]);
    console.log("Result -", result.rows);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  try {
    const sql = `update employees set name =$1, birthday =$2, salary= $3 where id =$4`;
    const res = await db.query(sql, [name, birthday, salary, id]);
    console.log("result - ", res);
    if (res.rows === 0) {
      return null;
    }

    return getEmployee(id);
  } catch (error) {
    console.error("Error updating employee", error);
    throw error;
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  try {
    const sql = `delete from employees where id = $1 returning *;`;
    const res = await db.query(sql, [id]);
    console.log("Result -", res.rows);

    // If no rows were deleted → employee didn’t exist
    if (res.rows.length === 0) {
      return null;
    }

    return res.rows[0];
  } catch (err) {
    console.error("Error deleting employee:", err);
    throw err;
  }
}
