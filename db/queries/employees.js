import db from "#db/client";            


/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
try {
  const sql = `
  insert into employees(name, birthday, salary)
  values($1,$2,$3)
  returning * `;
  const values = [ name, birthday, salary];

  const res = await db.query(sql,values);
  return res.rows[0];
  
} catch (error) {
  console.error(error);
}
    
};

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
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
}
