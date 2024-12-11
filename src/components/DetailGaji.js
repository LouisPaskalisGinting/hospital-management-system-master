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
  const { payroll } = location.state || {};

  const [nama, setNama] = useState(payroll?.name || "Karyawan 1");
  const [idKaryawan, setIdKaryawan] = useState(payroll?.employeeId || "187742");
  const [jabatan, setJabatan] = useState(payroll?.position || "Perawat");
  const [totalGaji, setTotalGaji] = useState(
    payroll?.totalSalary || "Rp. 6.000.000"
  );
  const [keteranganGaji, setKeteranganGaji] = useState(
    payroll?.status || "Diambil",
    "Belum"
  );
  const [tanggalPengambilan, setTanggalPengambilan] = useState(
    payroll?.paymentDate || "2024-11-20"
  );

  // Mengupdate data yang telah diubah
  const handleSave = () => {
    const updatedData = {
      name: nama,
      employeeId: idKaryawan,
      position: jabatan,
      totalSalary: totalGaji,
      status: keteranganGaji,
      paymentDate: tanggalPengambilan,
    };

    alert("Data gaji telah disimpan!");

    // Mengirim data yang diperbarui kembali ke halaman Payroll
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
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <label>ID Karyawan</label>
          <input
            type="text"
            value={idKaryawan}
            onChange={(e) => setIdKaryawan(e.target.value)}
          />

          <label>Jabatan</label>
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
          />

          <label>Total Gaji</label>
          <input
            type="text"
            value={totalGaji}
            onChange={(e) => setTotalGaji(e.target.value)}
          />

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