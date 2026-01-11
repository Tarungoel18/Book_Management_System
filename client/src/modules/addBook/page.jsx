import { useState } from "react";
import { addBookApi } from "./services/bookService.js";

export default function AddBook() {
  const [form, setForm] = useState({
    name: "",
    author: "",
    isbn: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        title: form.name,
        author: form.author,
        isbn: form.isbn,
        price: form.price,
        quantity: Number(form.quantity),
        about: form.description,
      };

      await addBookApi(payload);

      setSuccess("Book added successfully 🎉");

      setForm({
        name: "",
        author: "",
        isbn: "",
        price: "",
        quantity: "",
        description: "",
      });
    } catch (err) {
      console.error("Add book error:", err);
      setError("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mt-8">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Add Book
        </h2>

        <hr className="mb-6" />

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Book Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Author"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="ISBN"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Price"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Quantity"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About the book
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="desciption"
            />
          </div>

          {error && (
            <p className="text-red-600 mb-3 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 mb-3 text-sm">{success}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
