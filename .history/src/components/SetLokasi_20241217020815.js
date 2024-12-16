import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../assets/static/SetLokasi.css";

const SetLokasi = () => {
  const navigate = useNavigate();

  return (
    <div className="set-lokasi-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img
            src="/logoklinik.png"
            alt="Klinik Utama Kasih Ibu Logo"
            className="logo"
          />
        </div>
        <ul className="sidebar-menu">
          <li>
            <a className="active" href="/dashboard">
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

      <main className="set-lokasi-content">
        <header className="set-lokasi-header">
          <h2>Setting Lokasi Presensi</h2>
          <div className="user-info">
            <span>Admin</span>
            <div className="user-icon">A</div>
          </div>
        </header>

        <section className="location-settings">
          <div className="location-card">
            <label>Lokasi Kantor</label>
            <input
              type="text"
              value="-5.304977209759005, 105.19151576277606"
              readOnly
            />
            <label>Radius</label>
            <input type="text" value="30" readOnly />
            <div className="map-container">
              <img src="/mnt/data/image.png" alt="Map" />
            </div>
            <div className="action-buttons">
              <button className="back-button">Back</button>
              <button className="setting-button">Setting</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SetLokasi;
