import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiError.js';
import pool from '../database/dbConnection.js';

export const updateItem = async (id, table, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  values.push(id);

  const query = `
            UPDATE ${table}
            SET ${fields.join(', ')}
            WHERE id = $${index}
            RETURNING *;
        `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Item does not exist');
  }
  return result.rows[0];
};
