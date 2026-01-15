import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { Profile } from "../pages/Profile";


export default function AppRouter() {
  const { isAuth } = useAuthStore();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />

      <Route
        path="/"
        element={isAuth ? <Navigate to="/profile" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
