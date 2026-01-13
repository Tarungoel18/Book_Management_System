import { useState } from "react";

export default function LoginForm({ onSubmit , error }) {
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row ">

         <div className="w-full lg:w-[40%] flex items-center justify-center min-h-screen px-6">
        <div className="max-w-sm w-full">
                  <div className="mb-8">
                      <h1 className="font-normal text-2xl text-[#374151]">Login</h1>
                      <p className="font-normal text-base text-[#374151]">Enter your details to login into the system</p>
                  </div>
           <div>
            <label className="font-normal">Email/username</label>
              <input
        className="border rounded-md p-2 w-full mb-3 border-[#D1D5DB] "
        placeholder="Enter your email/username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label className="font-normal">Password</label>
      <input
        type="password"
        className="border rounded-md border-[#D1D5DB] p-2 w-full mb-3"
        placeholder="Enter your password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}

      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
           </div>
        <p className="text-[#0066CC] float-right mb-8">Forgot Password?</p>
      <button
        className="bg-[#4F46E5] rounded-lg text-white px-4 py-2 w-full cursor-pointer"
        onClick={() => onSubmit(form)}
      >
        Login
      </button>
    </div>

    </div>

    <div className=" hidden lg:block lg:w-[60%]">
        <img src="./sidebar.jpg" className="w-full h-full object-cover"/>
    </div>
    </div>
   
    
  );
}
