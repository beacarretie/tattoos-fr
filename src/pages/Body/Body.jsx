import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Artists } from "../Artists/Artists";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";

export const Body = () => {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};