import React from "react";
import DashboardLayout from '../components/layout/dashboardLayout/DashboardLayout';
import UserProfilePage from "./user/UserProfilePage";

const DashboardPage = () => {
  const user = { nombre: "Luciano", apellido: "Gatti" };

  return (
    <DashboardLayout user={user}>
      <UserProfilePage />
    </DashboardLayout>
  );
};

export default DashboardPage;