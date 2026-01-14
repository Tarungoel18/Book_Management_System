import { useState } from "react";
import { addStudent } from "./service/addStudent.js";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.name.trim()) {
      setError("Student name is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.mobile.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (form.mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email_address: form.email,
        mobile_number: form.mobile,
        about: form.about,
      };

      await addStudent(payload);

      setForm({
        name: "",
        email: "",
        mobile: "",
        about: "",
      });

      navigate("/students");
    } catch (err) {
      console.error("Add student error:", err);
      setError("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mt-8">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Add Student
        </h2>

        <hr className="mb-6" />

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Student Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Mobile Number"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About Student
            </label>
            <textarea
              name="about"
              rows={4}
              value={form.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="About student"
            />
          </div>

          {error && (
            <p className="text-red-600 mb-3 text-sm">{error}</p>
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
