import {createBook,getBooksPaginated} from "../services/book.service.js"

export const addBook = async (req,res) => {
   const {title,author,isbn,price,quantity,about} = req.body;

     if (!title || !author || !isbn || !price || !quantity || !about) {
    return res.status(400).json({ message: "All fields are required" });
  } 
  if(isbn.length !== 13) return res.status(400).json({message: "Isbn No. should be of 13 Digits"})


    const bookId = await createBook({
        ...req.body,
        created_by_id:req.user.id,
    });

    res.status(201).json({
        message: "Book added successfully",
        bookId,
    });

}


export const getBooks = async (req,res) => {
    const page  = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const books  = await getBooksPaginated(limit,offset);

    res.json({
        page,
        limit,
        data:books,
    })
}