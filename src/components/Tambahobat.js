import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoklinik2.png";
import "../assets/static/Tambahobat.css";

const TambahObat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tanggalMasuk: "13/11/2024",
    namaObat: "",
    idObat: "",
    stokTersedia: "",
  });

  // Handle input perubahan
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/obat", { state: { obatBaru: formData } }); // Navigasi dengan data obat baru
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>Data Obat</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        {/* Form Tambah Obat */}
        <div className="tambah-obat-container">
          <div className="form-container">
            <h3>Tambah Data Obat Baru</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tanggalMasuk">
                  Tanggal Masuk<span>*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="tanggalMasuk"
                    value={formData.tanggalMasuk}
                    readOnly
                  />
                  <i className="icon-calendar"></i>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="namaObat">
                  Nama Obat<span>*</span>
                </label>
                <input
                  type="text"
                  id="namaObat"
                  value={formData.namaObat}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Obat"
                />
              </div>

              <div className="form-group">
                <label htmlFor="idObat">
                  ID Obat<span>*</span>
                </label>
                <input
                  type="text"
                  id="idObat"
                  value={formData.idObat}
                  onChange={handleChange}
                  placeholder="Masukkan ID Obat"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stokTersedia">
                  Stok Obat<span>*</span>
                </label>
                <input
                  type="number"
                  id="stokTersedia"
                  value={formData.stokTersedia}
                  onChange={handleChange}
                  placeholder="Masukkan Stok Obat"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/obat")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahObat;
