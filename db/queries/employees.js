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
    console.error(error);
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
export async function getEmployeesId(id) {
  // TODO
  try {
    const sql = `SELECT * FROM employees WHERE id = $1;`;
    const result = await db.query(sql, [id]);
    console.log("Result -", result.rows);
    return result.rows[0].id;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  try{
const sql = `delete * from employees where id = $1;`;
const res = await db.query(sql,[id]);
console.log("Result -", result.rows);
return res.rows[0].id;
  }
  catch(err){
    console.error(err);
  }
}
