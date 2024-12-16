import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation
import "../assets/static/Detailobat.css";
import logo from "../assets/img/logoklinik2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const DataObat = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const location = useLocation(); // Gunakan useLocation untuk menerima state
  const { obat } = location.state || {}; // Ambil data obat dari state

  const handleKembali = () => {
    navigate("/obat"); // Kembali ke halaman Obat
  };

  if (!obat) {
    return <div>Data obat tidak ditemukan!</div>;
  }

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/dashboard">
              <FontAwesomeIcon icon={faHouse} /> Dashboard
            </a>
          </li>
          <li>
            <a href="/karyawan">
              <FontAwesomeIcon icon={faUsers} /> Kehadiran Karyawan
            </a>
          </li>
          <li>
            <a href="/cuti">
              <FontAwesomeIcon icon={faClipboardCheck} /> Cuti Karyawan
            </a>
          </li>
          <li>
            <a className="active" href="/obat">
              <FontAwesomeIcon icon={faPills} /> Obat
            </a>
          </li>
          <li>
            <a href="/payroll">
              <FontAwesomeIcon icon={faMoneyCheckAlt} /> Payroll
            </a>
          </li>
          <li>
            <a href="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </a>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="header">
          <h2>Data Obat</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="data-obat-konten">
          <h1>Detail Tentang Obat</h1>
          <div className="detail-obat">
            <div className="kolom-obat">
              <label>Tanggal Masuk</label>
              <input type="text" value={obat.tanggalMasuk} readOnly />
            </div>
            <div className="kolom-obat">
              <label>Nama Obat</label>
              <input type="text" value={obat.namaObat} readOnly />
            </div>
            <div className="kolom-obat">
              <label>ID Obat</label>
              <input type="text" value={obat.idObat} readOnly />
            </div>
            <div className="kolom-obat">
              <label>Stok Obat</label>
              <input type="text" value={obat.stokTersedia} readOnly />
            </div>
            <button className="tombol-kembali" onClick={handleKembali}>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataObat;
