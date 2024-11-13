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
import "../assets/static/Karyawan.css";
import logo from "../assets/img/logoklinik2.png";

const Karyawan = () => {
  const [attendanceData] = useState([
    {
      id: "112423",
      nama: "Karyawan 1",
      jabatan: "Admin",
      tanggal: "12/10/2024",
      waktuLogin: "07:45 AM",
      status: "Hadir",
      location: { lat: -6.2, lng: 106.816666 },
    },
    {
      id: "527310",
      nama: "Karyawan 2",
      jabatan: "Perawat",
      tanggal: "12/10/2024",
      waktuLogin: "07:45 AM",
      status: "Hadir",
      location: { lat: -7.250445, lng: 112.768845 },
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(5);

  const handleOpenMap = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseMap = () => {
    setSelectedEmployee(null);
  };

  const handleExport = () => {
    console.log("Ekspor data ke CSV");
    // Logika ekspor ke CSV dapat ditambahkan di sini
  };

  const handleEntriesChange = (e) => {
    setEntries(parseInt(e.target.value, 10));
  };

  const filteredData = attendanceData.filter((data) =>
    data.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <a className="active" href="/karyawan">
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

      <div className="main-content">
        <header className="header">
          <h2>Kehadiran Karyawan</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="content">
          <div className="top-controls">
            <div className="show-entries">
              <label>Show entries: </label>
              <select value={entries} onChange={handleEntriesChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
            <div className="filter">
              <label>Filter: </label>
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="export-button" onClick={handleExport}>
              Export
            </button>
          </div>

          <div className="attendance-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Waktu Presensi</th>
                  <th>Tanggal</th>
                  <th>Nama</th>
                  <th>ID Karyawan</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, entries).map((data, index) => (
                  <tr key={index}>
                    <td>{data.waktuLogin}</td>
                    <td>{data.tanggal}</td>
                    <td>{data.nama}</td>
                    <td>{data.id}</td>
                    <td>{data.jabatan}</td>
                    <td>
                      <span className="status hadir">{data.status}</span>
                    </td>
                    <td>
                      <button
                        className="lihat-kehadiran-button"
                        onClick={() => handleOpenMap(data)}
                      >
                        Lihat Kehadiran
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button>{"<"}</button>
              <span>1</span>
              <button>{">"}</button>
            </div>
          </div>

          {selectedEmployee && (
            <div className="modal-overlay" onClick={handleCloseMap}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Lokasi Presensi {selectedEmployee.nama}</h3>
                <iframe
                  title="Employee Attendance Location"
                  width="100%"
                  height="400px"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${selectedEmployee.location.lat},${selectedEmployee.location.lng}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
                <button className="close-button" onClick={handleCloseMap}>
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Karyawan;
