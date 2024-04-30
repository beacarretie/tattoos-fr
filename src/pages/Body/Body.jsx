import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Characters } from "../Characters/Characters";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { Artist } from "../Artist/Artist";

import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { ArtistRoute } from "../../components/ArtistRoute/ArtistRoute";

export const Body = () => {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/artist" element={<ArtistRoute Component={Artist} />} />

      </Routes>
    </>
  );
};