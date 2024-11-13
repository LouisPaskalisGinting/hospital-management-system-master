import React, { useState } from "react";
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
import logo from "../assets/img/logoklinik2.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState("-5.304977209759005");
  const [longitude, setLongitude] = useState("105.19151576277606");
  const [radius, setRadius] = useState(30);

  const handleViewMore = () => {
    navigate("/DataKaryawan");
  };

  const handleSetLocation = () => {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Radius:", radius);
    navigate("/setlokasi");
  };

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
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

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Klinik Utama Kasih Ibu</h2>
        </header>

        <section className="info-cards">
          <div className="card blue-card">
            <p>KARYAWAN</p>
            <p>Jumlah: 30 Orang</p>
            <button onClick={handleViewMore}>Lihat Detail</button>
          </div>
          <div className="card red-card">
            <p>OBAT</p>
            <p>Jenis Obat: 40 Pcs</p>
            <button>Lihat Detail</button>
          </div>
          <div className="card yellow-card">
            <p>JABATAN</p>
            <p>Total Bidang: 6 Posisi</p>
            <button>Lihat Detail</button>
          </div>
          <div className="card green-card">
            <p>INFORMASI PAYROLL</p>
            <p>Klinik Utama Kasih Ibu</p>
            <button>Lihat Detail</button>
          </div>
        </section>

        <section className="clinic-location">
          <h3>Lokasi Klinik Utama Kasih Ibu</h3>
          <div className="map-card">
            <div className="map-container">
              <img
                src="/mnt/data/image.png"
                alt="Peta menunjukkan lokasi Klinik Utama Kasih Ibu"
              />
            </div>
            <div className="location-info">
              <label>
                Lokasi Klinik (Latitude, Longitude)
                <input
                  type="text"
                  value={`${latitude}, ${longitude}`}
                  onChange={(e) => {
                    const [lat, lon] = e.target.value.split(",");
                    setLatitude(lat ? lat.trim() : "");
                    setLongitude(lon ? lon.trim() : "");
                  }}
                  placeholder="Masukkan Latitude, Longitude"
                />
              </label>
              <label>
                Radius (dalam meter)
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Masukkan Radius"
                />
              </label>
              <button onClick={handleSetLocation}>Set Lokasi</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
