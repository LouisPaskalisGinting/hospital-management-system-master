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
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../assets/static/CutiView.css";
import logo from "../assets/img/logoklinik2.png";

const CutiView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCuti } = location.state || {};

  if (!selectedCuti) {
    return <p>Data cuti tidak tersedia.</p>;
  }

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="active">
              <FontAwesomeIcon icon={faHouse} aria-hidden="true" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/karyawan">
              <FontAwesomeIcon icon={faUsers} aria-hidden="true" /> Kehadiran
              Karyawan
            </Link>
          </li>
          <li>
            <Link to="/cuti">
              <FontAwesomeIcon icon={faClipboardCheck} aria-hidden="true" />{" "}
              Cuti Karyawan
            </Link>
          </li>
          <li>
            <Link to="/obat">
              <FontAwesomeIcon icon={faPills} aria-hidden="true" /> Obat
            </Link>
          </li>
          <li>
            <Link to="/payroll">
              <FontAwesomeIcon icon={faMoneyCheckAlt} aria-hidden="true" />{" "}
              Payroll
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} aria-hidden="true" /> Log Out
            </Link>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="header">
          <h2>Cuti Karyawan</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="cuti-view-container">
          <h2>Cuti Karyawan</h2>
          <div className="cuti-details">
            <div className="cuti-detail-item">
              <label>ID Karyawan</label>
              <input type="text" value={selectedCuti.idKaryawan} readOnly />
            </div>
            <div className="cuti-detail-item">
              <label>Nama Karyawan</label>
              <input type="text" value={selectedCuti.nama} readOnly />
            </div>
            <div className="cuti-detail-item">
              <label>Jabatan</label>
              <input type="text" value={selectedCuti.jabatan} readOnly />
            </div>
            <div className="cuti-detail-item">
              <label>Kategori Cuti</label>
              <input type="text" value={selectedCuti.kategoriCuti} readOnly />
            </div>
            <div className="cuti-detail-item">
              <label>Keterangan Mengajukan Cuti</label>
              <input type="text" value={selectedCuti.keterangan} readOnly />
            </div>
            <div className="cuti-detail-item">
              <label>Bukti Dokumen Cuti</label>
              <button
                className="btn btn-primary"
                onClick={() =>
                  window.open(
                    `/path/to/documents/${selectedCuti.dokumen}`,
                    "_blank"
                  )
                }
              >
                Lihat Lampiran
              </button>
            </div>
            <div className="cuti-detail-item">
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CutiView;
