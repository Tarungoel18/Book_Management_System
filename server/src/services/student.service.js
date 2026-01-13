import pool from "../config/db.js"

export const createStudent = async (data) => {
    const { name, email_address, mobile_number, about } = data;
    const [result] = await pool.query(
        `INSERT INTO students 
        (name , email_address , mobile_number ,about)
        VALUES(?,?,?,?)
        `,
        [name, email_address, mobile_number, about]
    );
    return result.insertId;

}


export const getStudentsPaginated = async (limit, offset) => {
    const [rows] = await pool.query(
        `SELECT * FROM students
        ORDER BY created_at DESC
        LIMIT ? OFFSET ? `,
        [limit, offset]
    );
    return rows;

}

export const findByEmailAndPhoneNumber = async (email_address,mobile_number) => {
    const [rows] = await pool.query(
        ` SELECT * FROM students 
        WHERE email_address = ? OR 
        mobile_number = ?`,
        [email_address,mobile_number]
    )
    return rows[0];
}