import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/static/Cuti.css";

const Cuti = () => {
  const navigate = useNavigate();

  const [cutiData] = useState([
    {
      tanggalPengajuan: "15/10/2024",
      nama: "Karyawan 1",
      idKaryawan: "112423",
      jabatan: "Admin",
      kategoriCuti: "Sakit",
      keterangan: "Demam",
      dokumen: "dokumen-karyawan1.pdf",
      status: "View",
    },
  ]);

  const handleViewClick = (data) => {
    // Navigasi ke halaman CutiView dengan mengirim data cuti yang dipilih
    navigate("/cuti/view", { state: { selectedCuti: data } });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a className="active" href="/dashboard">
              <FontAwesomeIcon icon={faHouse} /> Dashboard
            </a>
          </li>
          <li>
            <a href="/karyawan">
              <FontAwesomeIcon icon={faUsers} /> Karyawan
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
          <h2>Cuti Karyawan</h2>
        </header>

        <div className="content">
          <div className="cuti-table">
            <table>
              <thead>
                <tr>
                  <th>Tanggal Pengajuan</th>
                  <th>Nama</th>
                  <th>ID Karyawan</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cutiData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.tanggalPengajuan}</td>
                    <td>{data.nama}</td>
                    <td>{data.idKaryawan}</td>
                    <td>{data.jabatan}</td>
                    <td>
                      <button
                        className="status-button"
                        onClick={() => handleViewClick(data)}
                      >
                        {data.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuti;
