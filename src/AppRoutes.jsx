import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './modules/dashboard/Dashboard';
import SchoolList from './modules/ecoles/SchoolList';
import Utilisateurs from './modules/utilisateurs/Utilisateurs';
import Paiements from './modules/paiements/Paiements';
import Parametres from './modules/parametres/Parametres';
import DetailEcole from './modules/ecoles/DetailEcole';
import Frais from './modules/frais/Frais';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ecoles" element={<SchoolList />} />
      <Route path="/utilisateurs" element={<Utilisateurs />} />
      <Route path="/paiements" element={<Paiements />} />
      <Route path="/parametres" element={<Parametres />} />
      <Route path="/frais" element={<Frais />} />
      <Route path="/ecoles/:id" element={<DetailEcole />} />
    </Routes>
  );
}
