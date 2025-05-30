const db = require("../index");

async function findOrCreateDepartementByName(departementName) {
  const result = await db.query(
    `SELECT id FROM departments WHERE upper(name) = upper($1)`,
    [departementName]
  );

  if (result.rowCount > 0) {
    return result.rows[0].id;
  } else {
    const insert = await db.query(
      `INSERT INTO departments(name) VALUES ($1) RETURNING id`,
      [departementName]
    );
    return insert.rows[0].id;
  }
}

async function findOrCreateCityByName(cityName, departementName) {
  const result = await db.query(
    `SELECT id FROM cities WHERE upper(name) = upper($1)`,
    [cityName]
  );

  if (result.rowCount > 0) {
    // ville trouvée, mais on ne connaît pas forcément le département
    const cityId = result.rows[0].id;
    const departmentId = await findOrCreateDepartementByName(departementName);
    return { city_id: cityId, departement_id: departmentId };
  } else {
    const departmentId = await findOrCreateDepartementByName(departementName);
    const insert = await db.query(
      `INSERT INTO cities(name, department_id) VALUES ($1, $2) RETURNING id`,
      [cityName, departmentId]
    );
    return {
      city_id: insert.rows[0].id,
      departement_id: departmentId,
    };
  }
}

module.exports = {
  findOrCreateCityByName,
  findOrCreateDepartementByName,
};
