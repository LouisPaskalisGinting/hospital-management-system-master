import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Karyawan from "./components/Karyawan";
import Cuti from "./components/Cuti";
import SetLokasi from "./components/SetLokasi";
import CutiView from "./components/CutiView";
import Kehadiran from "./components/Kehadiran";
import Obat from "./components/Obat";
import Payroll from "./components/Payroll";
import Company from "./components/Company";
import DataKaryawan from "./components/DataKaryawan";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Routes>
            {/* Menambahkan route yang secara otomatis mengarahkan dari '/' ke '/login' */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/karyawan" element={<Karyawan />} />
            <Route path="/cuti" element={<Cuti />} />
            <Route path="/cuti/view" element={<CutiView />} />
            <Route path="/kehadiran" element={<Kehadiran />} />
            <Route path="/setlokasi" element={<SetLokasi />} />
            <Route path="/obat" element={<Obat />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/company" element={<Company />} />
            <Route path="/datakaryawan" element={<DataKaryawan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
