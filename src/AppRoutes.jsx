import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Login from './Login.jsx';
import Dashboard from './modules/dashboard/Dashboard';
import SchoolList from './modules/ecoles/SchoolList';
import DetailEcole from './modules/ecoles/DetailEcole';
import Utilisateurs from './modules/utilisateurs/Utilisateurs';
import Paiements from './modules/paiements/Paiements';

import Frais from './modules/frais/Frais';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<AdminLayout />}>
        {}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ecoles" element={<SchoolList />} />
        <Route path="ecoles/:id" element={<DetailEcole />} />
        <Route path="utilisateurs" element={<Utilisateurs />} />
        <Route path="paiements" element={<Paiements />} />
        <Route path="frais" element={<Frais />} />
        
      </Route>

      {}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
