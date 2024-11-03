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
import "../assets/static/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/DataKaryawan");
  };

  const handleSetLocation = () => {
    navigate("/setlokasi"); // Menambahkan navigasi ke halaman SetLokasi
  };

  return (
    <div className="dashboard-layout">
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

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Klinik Utama Kasih Ibu</h2>
        </header>

        <section className="info-cards">
          <div className="card blue-card">
            <p>KARYAWAN</p>
            <p>Jumlah: 30 Orang</p>
            <button onClick={handleViewMore}>View Details</button>
          </div>
          <div className="card red-card">
            <p>OBAT</p>
            <p>Jenis Obat: 40 Pcs</p>
            <button>View Details</button>
          </div>
          <div className="card yellow-card">
            <p>JABATAN</p>
            <p>Total Bidang: 6 Posisi</p>
            <button>View Details</button>
          </div>
          <div className="card green-card">
            <p>INFORMASI PAYROLL</p>
            <p>Klinik Utama Kasih Ibu</p>
            <button>View Details</button>
          </div>
        </section>

        <section className="clinic-location">
          <h3>Lokasi Klinik Utama Kasih Ibu</h3>
          <div className="map-card">
            <div className="map-container">
              <img
                src="/mnt/data/image.png"
                alt="Map showing location of Klinik Utama Kasih Ibu"
              />
            </div>
            <div className="location-info">
              <label>
                Lokasi Klinik (Latitude, Longitude)
                <input
                  type="text"
                  value="-5.304977209759005, 105.19151576277606"
                  readOnly
                />
              </label>
              <label>
                Radius
                <input type="number" value="30" readOnly />
              </label>
              <button onClick={handleSetLocation}>Setting Lokasi</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
