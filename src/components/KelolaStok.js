import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/KelolaStok.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoklinik2.png";

const KelolaStok = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { obat } = location.state || {}; // Terima data obat dari navigasi
  const [tanggalMasuk] = useState(obat?.tanggalMasuk || "N/A");
  const [jumlahMasuk] = useState(obat?.stokTersedia || 0);
  const [jumlahKeluar, setJumlahKeluar] = useState(0);
  const [sisaStok, setSisaStok] = useState(jumlahMasuk);
  const [keterangan, setKeterangan] = useState(""); // Tambahkan state untuk keterangan

  const handleSave = () => {
    alert(
      `Data berhasil disimpan!\nNama Obat: ${obat.namaObat}\nJumlah Keluar: ${jumlahKeluar}\nSisa Stok: ${sisaStok}\nKeterangan: ${keterangan}`
    );
    navigate("/obat");
  };

  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    navigate("/obat");
  };

  const handleJumlahKeluarChange = (value) => {
    setJumlahKeluar(value);
    setSisaStok(jumlahMasuk - value);
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

        <div className="kelola-stok-container">
          <h2 className="kelola-stok-title">
            Manajemen Stok Obat: {obat.namaObat}
          </h2>
          <div className="kelola-stok-form">
            <div className="form-group">
              <label>Tanggal Masuk</label>
              <input
                type="text"
                value={tanggalMasuk}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Jumlah Masuk</label>
              <input
                type="number"
                value={jumlahMasuk}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Jumlah Keluar</label>
              <input
                type="number"
                value={jumlahKeluar}
                onChange={(e) =>
                  handleJumlahKeluarChange(Number(e.target.value))
                }
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Sisa Stok Obat</label>
              <input
                type="number"
                value={sisaStok}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Keterangan</label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Masukkan alasan pengurangan obat"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="kelola-stok-actions">
              <button className="btn cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaStok;
