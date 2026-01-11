import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function AddBook() {
  const [form, setForm] = useState({
    name: "",
    author: "",
    isbn: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    // later → API call
  };

  return (
    <Box className=" shadow-xl rounded-lg ">
      <Typography className="text-[#374151]" ml={3} pt={2} mt={3} variant="h5" fontWeight={500} mb={2}>
        Add Book
      </Typography>

      <hr/>

      <Paper elevation={2}  sx={{ pt: 4, ml:2, py:10,mt:4, maxWidth: 900 }}>
        <Grid container spacing={3}>
          {/* Book Name */}
          <Grid item xs={12} md={6}>
            <Typography className="mb-1 text-sm font-medium text-gray-700">
              Book Name
            </Typography>
            <TextField
              fullWidth
              label="Book Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          {/* Author */}
          <Grid item xs={12} md={6}>
              <Typography className="mb-1 text-sm font-medium text-gray-700">
              Author
            </Typography>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
            />
          </Grid>

          {/* ISBN */}
          <Grid item xs={12} md={6}>
              <Typography className="mb-1 text-sm font-medium text-gray-700">
              ISBN
            </Typography>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={3}>
              <Typography className="mb-1 text-sm font-medium text-gray-700">
              Price
            </Typography>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} md={3}>
              <Typography className="mb-1 text-sm font-medium text-gray-700">
              Quantity
            </Typography>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
              <Typography className="mb-1 text-sm font-medium text-gray-700">
               About the book(short description)
            </Typography>
            <TextField
              fullWidth
              label="About the book (short description)"
              name="description"
              multiline
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
