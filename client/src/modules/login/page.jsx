import LoginForm from "./component/LoginForm.jsx";
import { loginApi } from "./services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error , setError]  = useState(null)

  const handleLogin = async (data) => {
    try{
      const res = await loginApi(data);
      if(res?.data?.isLogin === false){
        setError(res?.data?.message || "Login failed" )
        return;
      }
      console.log(res , "this ")
     localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    dispatch(loginSuccess());
    console.log("Yess")
    navigate("/add-book");
    }
    catch(err){
      console.log(err)
      setError(err.response?.data?.message || "Login failed" )
    }
   
   
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
}
