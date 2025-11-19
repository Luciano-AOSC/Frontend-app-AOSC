import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from '../components/layout/dashboardLayout/DashboardLayout';
import UserProfilePage from "./user/UserProfilePage";
import CreateUserPage from "./user/CreateUserPage";


const DashboardPage = () => {
  const user = { nombre: "Luciano", apellido: "Gatti" };

  return (
    <DashboardLayout user={user}>
      <Routes>
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="edit-profile" element={<UserProfilePage readOnly={false}/>} />
        <Route path="create-user" element={<CreateUserPage readOnly={false}/>} />

        
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardPage;