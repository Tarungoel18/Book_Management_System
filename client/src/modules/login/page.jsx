import LoginForm from "./component/LoginForm.jsx";
import { loginApi } from "./services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const res = await loginApi(data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    dispatch(loginSuccess());
    console.log("Yess")
    navigate("/add-book");
  };

  return <LoginForm onSubmit={handleLogin} />;
}
