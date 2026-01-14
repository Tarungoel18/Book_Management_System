import {getIssuedBooks, getreturnedBook,createBookIssued,markReturned,getUserWithStudentName,getBookWithName,issueBookToStudent,fetchIssuedBooks,patchStatusService} from "../services/bookIssued.service.js"

export const issueBook = async (req,res) => {
    const {issueDate,student_name, book_name} = req.body;
    console.log(student_name)
    const student_id = await  getUserWithStudentName(student_name)
    console.log(student_id);
    if(student_id.length == 0){
       return res.status(400).json({message : "No student with this name"});
    }
    const book_id =await  getBookWithName(book_name)
    if(book_id.length == 0){
       return res.status(400).json({message : "No Book with this name"});
    }
   console.log(book_id)
    const issueId = await createBookIssued({
        issueDate:issueDate,
        returnDate:null,
        student_id:student_id.id,
        book_id:book_id.id
    })
    return res.status(201).json({
        message:"Book Issued successfully",
        issueId
    })
}

export const getBooksIssued = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const issuedBookss = await getIssuedBooks(limit, offset);

    res.json({
        page,
        limit,
        data: issuedBookss,
    })
}

export const getBooksReturned = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const returnedBooks = await getreturnedBook(limit, offset);

    res.json({
        page,
        limit,
        data: returnedBooks,
    })
}

export const markAsReturned = async (req,res) => {
    const {returnDate,student_name, book_name} = req.body;

     const student_id = await  getUserWithStudentName(student_name)
    if(!student_id){
       return res.status(400).json({message : "No student with this name"});
    }
    const book_id = await getBookWithName(book_name)
    if(!book_id){
       return res.status(400).json({message : "No Book with this name"});
    }

    const borrowerId = await getUserWithStudentAndBookId(student_id,book_id);
    if(!borrowerId) return res.status(400).json({message: "No Book Issued"});

    const returnedId =await markReturned(returnDate,borrowerId.id);

    return res.status(201).json({
        message:"Book marked as returned",
        returnedId
    });


}



export const issuingBookToStudent = async (req,res) => {
    console.log(req.body,"thisssss")
    const {student_id,book_id, statuss} = req.body;

     const issueId = await issueBookToStudent({
        student_id,
        book_id,
        statuss
    })
    return res.status(201).json({
        message:"Book Issued successfully",
        issueId
    })
}


export const fetchIssuedBooksController = async (req, res) => {
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const issuedBooks = await fetchIssuedBooks(limit,offset);
    console.log(issuedBooks,"issuedBooksissss")
    res.json({
        page,
        limit,
        data: issuedBooks,
    });
}


export const patchStatusController = async (req, res) => {
    console.log("ywdhauhd")
    console.log(req.body)
    const { id, status } = req.body;
    const result = await patchStatusService({ id, status });
    console.log("djhjbh")
     return res.status(201).json({
        message: "Status updated successfully",
        result,
    });
}