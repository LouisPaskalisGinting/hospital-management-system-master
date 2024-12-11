import React, { useState } from "react";
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
import ViewObat from "./components/Viewobat";
import DetailObat from "./components/DetailObat";
import Tambahobat from "./components/Tambahobat";
import KelolaStok from "./components/KelolaStok";
import EditObat from "./components/EditObat";
import ViewJabatan from "./components/ViewJabatan";
import DetailGaji from "./components/DetailGaji";
import LaporanObat from "./components/LaporanObat";
import TambahGaji from "./components/TambahGaji";

function App() {
  // State untuk laporan obat
  const [laporan, setLaporan] = useState([]);

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
            <Route path="/viewobat" element={<ViewObat />} />
            <Route path="/detailobat" element={<DetailObat />} />
            <Route path="/tambahobat" element={<Tambahobat />} />
            <Route
              path="/kelolastok"
              element={<KelolaStok laporan={laporan} setLaporan={setLaporan} />}
            />
            <Route path="/editobat" element={<EditObat />} />
            <Route path="/viewjabatan" element={<ViewJabatan />} />
            <Route path="/detailgaji" element={<DetailGaji />} />
            <Route path="/tambahgaji" element={<TambahGaji />} />
            <Route
              path="/laporanobat"
              element={<LaporanObat laporan={laporan} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;