import { pgClient } from "../db";

// Function to generate random function between min and max number
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Function to create a new contact
export const createNewContact = async (
  id: number,
  email: string,
  phoneNumber: string,
  linkedId:number | null,
  linkPrecedence:string
) => {
  try {
    const query = `
      INSERT INTO contact (id, phone_number, email, linked_id,link_precedence, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5,NOW(), NOW())
      RETURNING id, email, phone_number
    `;
    const values = [id, phoneNumber, email, linkedId,linkPrecedence];
    const client = await pgClient();

    const { rows } = await client.query(query, values);
    await client.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateContactPrecedence = async (
  id: number,
  linkedId:number,
  link_precedence: string
) => {
  try {
    const query = `
    UPDATE contact
    SET  linked_id=$2, link_precedence=$3, updated_at=now()
    WHERE id=$1;
    `;
    const values = [id,  linkedId, link_precedence];
    const client = await pgClient();

    const { rows } = await client.query(query, values);
    await client.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to identify contact based on email and/or phoneNumber
export const identifyContact = async (email: string, phoneNumber: string) => {
  try {
    const query = `
    SELECT *
    FROM contact
    WHERE (CASE WHEN email is not null then email = $1 end) OR 
	(CASE when phone_number is not null then phone_number  = $2 end)
    ORDER BY created_at ASC
	
      `;
    const values = [email, phoneNumber];
    const client = await pgClient();
    const { rows } = await client.query(query, values);
    await client.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get secondary contact IDs linked to a primary contact
export const getSecondaryContactIds = async (primaryContactId: number) => {
  try {
    const query = `
        SELECT id
        FROM contact
        WHERE linked_id = $1 AND link_precedence = 'secondary'
      `;
    const values = [primaryContactId];
    const client = await pgClient();
    const { rows } = await client.query(query, values);
    return rows.map((row) => row.id);
  } catch (error) {
    throw error;
  }
};
