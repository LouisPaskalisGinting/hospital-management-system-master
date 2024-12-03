import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/DetailGaji.css";
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

const DetailGaji = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil data dari state jika ada
  const { item } = location.state || {};
  const [nama, setNama] = useState(item?.nama || "Karyawan 1");
  const [idKaryawan, setIdKaryawan] = useState(item?.idKaryawan || "187742");
  const [jabatan, setJabatan] = useState(item?.jabatan || "Perawat");
  const [totalGaji, setTotalGaji] = useState(
    item?.totalGaji || "Rp. 6.000.000"
  );
  const [keteranganGaji, setKeteranganGaji] = useState(
    item?.keteranganGaji || "Diambil"
  );
  const [tanggalPengambilan, setTanggalPengambilan] = useState(
    item?.tanggalPengambilan || "2024-11-20"
  );

  const handleSave = () => {
    const updatedData = {
      nama,
      idKaryawan,
      jabatan,
      totalGaji,
      keteranganGaji,
      tanggalPengambilan,
    };

    alert("Data gaji telah disimpan!");
    navigate("/payroll", { state: { updatedData } });
  };

  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    navigate("/payroll");
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
            <a href="/obat">
              <FontAwesomeIcon icon={faPills} /> Obat
            </a>
          </li>
          <li>
            <a className="active" href="/payroll">
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

      <div className="detail-gaji-container">
        <h2>Detail Gaji</h2>
        <form className="detail-gaji-form">
          <label>Nama</label>
          <input type="text" value={nama} disabled />

          <label>ID Karyawan</label>
          <input type="text" value={idKaryawan} disabled />

          <label>Jabatan</label>
          <input type="text" value={jabatan} disabled />

          <label>Total Gaji</label>
          <input type="text" value={totalGaji} disabled />

          <label>Keterangan Gaji (Diambil/Belum)</label>
          <select
            value={keteranganGaji}
            onChange={(e) => setKeteranganGaji(e.target.value)}
          >
            <option value="Diambil">Diambil</option>
            <option value="Belum">Belum</option>
          </select>

          <label>Tanggal Pengambilan Gaji</label>
          <input
            type="date"
            value={tanggalPengambilan}
            onChange={(e) => setTanggalPengambilan(e.target.value)}
          />

          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="button" className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailGaji;
