import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { useAuthStore } from "../store/authStore";

export default function AppRouter() {
  const { isAuth } = useAuthStore();
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={isAuth ? <p>Welcome</p> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
