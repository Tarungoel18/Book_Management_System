import pool from "../config/db.js"

export const createBook = async (data) => {
const {
    title,
    author,
    isbn,
    price,
    quantity,
    about,
    created_by_id
} = data;

const [result] = await pool.query(
    `INSERT INTO book_details 
      (title, author, isbn, price, quantity, about, created_by_id)
      VALUES(?,?,?,?,?,?,?)`,
      [title,author,isbn,price,quantity,about,created_by_id]
);
return result.insertId;
};

export const getBooksPaginated = async  (limit,offset) => {
    const [rows] = await pool.query(
        `SELECT * FROM book_details
        ORDER BY created_at DESC
        LIMIT ? OFFSET ? `,
        [limit,offset]
    );
    return rows;

}