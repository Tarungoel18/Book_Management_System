import {createBook,getBooksPaginated,getAllBooks} from "../services/book.service.js"

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


export const getBooks = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  if (!page && !limit) {
    const books = await getAllBooks();
    return res.json({
      data: books,
    });
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const books = await getBooksPaginated(limitNum, offset);

  res.json({
    page: pageNum,
    limit: limitNum,
    data: books,
  });
};
