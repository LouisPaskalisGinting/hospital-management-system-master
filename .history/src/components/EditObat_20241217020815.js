import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/EditObat.css"; // Import file CSS
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

const EditObat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const obat = location.state?.obat || {};
  const updateObat = location.state?.updateObat || (() => {}); // Fungsi updateObat

  const [formData, setFormData] = useState({
    idObat: obat.idObat || "",
    tanggalMasuk: obat.tanggalMasuk || "",
    namaObat: obat.namaObat || "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Untuk menampilkan pop-up

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Mengirim data yang diperbarui kembali ke halaman Obat
    navigate("/obat", { state: { obatEdit: formData } });

    // Menampilkan pop-up setelah save
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    navigate("/obat"); // Kembali ke halaman daftar obat
  };

  const handlePopupContinue = () => {
    setIsPopupOpen(false); // Menutup pop-up dan melanjutkan ke halaman obat
    navigate("/obat");
  };

  const handlePopupCancel = () => {
    setIsPopupOpen(false); // Menutup pop-up tanpa melanjutkan
  };

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

        <div className="edit-obat-container">
          <h1>Edit Data Obat</h1>
          <div className="form-edit-obat">
            <div className="form-group">
              <label>ID Obat</label>
              <input
                type="text"
                name="idObat"
                value={formData.idObat}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>
                Tanggal Masuk <span className="required">*</span>
              </label>
              <input
                type="date"
                name="tanggalMasuk"
                value={formData.tanggalMasuk}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                Nama Obat <span className="required">*</span>
              </label>
              <input
                type="text"
                name="namaObat"
                value={formData.namaObat}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Konfirmasi */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>✔️</p>
            <p>Berhasil</p>
            <p>Data Obat Sudah Berhasil Diedit</p>
            <div className="popup-actions">
              <button className="continue-btn" onClick={handlePopupContinue}>
                Continue
              </button>
              <button className="cancel-btn" onClick={handlePopupCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditObat;
