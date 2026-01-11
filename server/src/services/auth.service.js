import pool from "../config/db.js"

export const findUserByUsername = async (username) => {
    const [rows] = await pool.query(
        "SELECT  * FROM auth_user WHERE username = ?", [username]
    );
    return rows[0];
}