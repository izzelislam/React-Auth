import React, {useContext} from "react";
import { AuthContext } from "../contex/Authcontex";
import { Navigate, Route, Routes } from "react-router-dom";


import Home from "../views/home";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Dashboard from "../views/admin/dashboard";
import UserIndex from "../views/admin/users";
import UserEdit from "../views/admin/users/edit";
import UserCreate from "../views/admin/users/create";

export default function AppRoutes(){

  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/admin/dashboard" replace/> : <Login/>
      } />

      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/admin/dashboard" replace/> : <Register/>
      } />

      <Route path="/admin/dashboard" element={
        isAuthenticated ? <Dashboard/> : <Navigate to="/login" replace/> 
      } />

      <Route path="/admin/users" element={
        isAuthenticated ? <UserIndex/> : <Navigate to="/login" replace/> 
      } />

      <Route path="/admin/users/create" element={
        isAuthenticated ? <UserCreate/> : <Navigate to="/login" replace/>
      } />

      <Route path="/admin/users/edit/:id" element={
        isAuthenticated ? <UserEdit/> : <Navigate to="/login" replace/>
      } />

    </Routes>
  )

}