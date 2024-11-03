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

const Karyawan = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: "1124",
      nama: "Karyawan 1",
      jabatan: "Admin",
      tanggal: "12-11-24",
      waktuLogin: "09:30AM",
      status: "Hadir",
      location: { lat: -6.200000, lng: 106.816666 }, // Lokasi Jakarta (Contoh)
    },
    {
      id: "5273",
      nama: "Karyawan 2",
      jabatan: "Perawat",
      tanggal: "12-11-24",
      waktuLogin: "09:00AM",
      status: "Hadir",
      location: { lat: -7.250445, lng: 112.768845 }, // Lokasi Surabaya (Contoh)
    },
    // Tambahkan karyawan lainnya sesuai kebutuhan
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenMap = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseMap = () => {
    setSelectedEmployee(null);
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

      <div className="main-content">
        <header className="header">
          <h2>Kehadiran Karyawan</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="attendance-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>ID Karyawan</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data, index) => (
                <tr key={index}>
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
        </div>

        {selectedEmployee && (
          <div className="modal-overlay" onClick={handleCloseMap}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Lokasi Presensi {selectedEmployee.nama}</h3>
              <iframe
                title="Employee Attendance Location"
                width="100%"
                height="400px"
                frameBorder="0"
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
  );
};

export default Karyawan;
