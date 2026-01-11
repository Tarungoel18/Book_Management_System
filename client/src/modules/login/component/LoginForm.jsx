import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <div className="max-w-sm mx-auto mt-32">
      <input
        className="border p-2 w-full mb-3"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 w-full"
        onClick={() => onSubmit(form)}
      >
        Login
      </button>
    </div>
  );
}
