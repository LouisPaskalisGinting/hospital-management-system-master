import React from "react";
import "../assets/static/LaporanObat.css";
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

const LaporanObat = ({ laporan = [] }) => {
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

      <main className="main-content">
        <header>
          <h2>Data Obat</h2>
        </header>
        <section className="report-container">
          <h3>Laporan stok obat amoxicillin</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Keterangan Stok</th>
                <th>Jumlah Stok</th>
                <th>Keterangan Lanjutan</th>
              </tr>
            </thead>
            <tbody>
              {laporan.map((item, index) => (
                <tr key={index}>
                  <td>{item.tanggal}</td>
                  <td>{item.keteranganStok}</td>
                  <td>{item.jumlahStok}</td>
                  <td>{item.keteranganLanjutan}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button>&lt;</button>
            <span>1</span>
            <button>&gt;</button>
          </div>
          <button className="back-button">Back</button>
        </section>
      </main>
    </div>
  );
};

export default LaporanObat;
