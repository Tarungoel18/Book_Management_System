import { createStudent, getStudentsPaginated, findByEmailAndPhoneNumber } from "../services/student.service.js";
export const addStudent = async (req, res) => {
    const { name, email_address, mobile_number, about } = req.body;

    if (!name || !email_address || !mobile_number || !about) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if(mobile_number.length != 10) return res.status(400).json({message:"Mobile Number should be of 10 digits"});
  
    const student = await findByEmailAndPhoneNumber(email_address, mobile_number);
    if (student) {
        return res.status(409).json({ message: "Email Or Phone No. Already exists" })
    }

    const studentId = await createStudent({
        ...req.body
    })
    res.status(201).json({
        message: "Books added successfully",
        studentId
    });
}


export const getStudents = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const students = await getStudentsPaginated(limit, offset);

    res.json({
        page,
        limit,
        data: students,
    })
}