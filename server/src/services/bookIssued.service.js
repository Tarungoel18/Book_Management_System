import pool from "../config/db.js";

export const getIssuedBooks = async (limit,offset) => {
    console.log(limit,offset)
    const [rows] = pool.query(
  `SELECT * FROM book_issued_student
    WHERE returnDate IS NULL
    ORDER BY issueDate DESC
        LIMIT ? OFFSET ? `,
     [limit, offset]
    );
    return rows;
}

export const  getreturnedBook = async (limit,offset) => {
    const [rows] = pool.query(
        `SELECT * FROM book_issued_student
         WHERE returnDate != NULL`,
     [limit, offset]
    );
    return rows;
}

export const createBookIssued = async (data) => {
    const {issueDate,returnDate,student_id , book_id} = data;
     const [result] = await pool.query(
        `INSERT INTO book_issued_student 
        (issueDate , returnDate , student_id ,book_id)
        VALUES(?,?,?,?)
        `,
        [issueDate, returnDate, student_id, book_id]
    );
    return result.insertId;
}

export const markReturned = async(data) => {
    const {returnDate,id} = data;
    const [result] = await pool.query(
        'UPDATE book_issued_student SET returnDate = ?    WHERE id = ?',
        [returnDate,id] 
    );
    return result;
}

export const getUserWithStudentName = async (student_name) => {
    const [result] = await pool.query(
        "Select * FROM students WHERE name = ? ", [student_name]
    );
    return result[0];

}

export const getBookWithName = async (book_name) => {
    const [result] = await pool.query(
        'Select * FROM book_details WHERE title = ?',
        [book_name]
    );
    return result[0];
}


export const getUserWithStudentAndBookId = async (data) => {
    const {student_id,book_id} = data;
    const [result] = await pool.query(
        'Select * FROM book_issued_student WHERE student_id = ? AND book_id = ?',
        [student_id,book_id]
    );
    return result;

}



export const issueBookToStudent = async ({student_id,book_id,statuss}) => {
 const [result] = await pool.query(
        `INSERT INTO issue_return_book 
        (student_id ,book_id,status)
        VALUES(?,?,?)
        `,
        [student_id, book_id, statuss]
    );

    return result.insertId;
}



export const fetchIssuedBooks = async () => {
    const [rows] = await pool.query(
        `SELECT * FROM issue_return_book`,
    );
    return rows;
}