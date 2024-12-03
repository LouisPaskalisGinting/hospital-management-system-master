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
import logo from "../assets/img/logoklinik2.png";

const Cuti = () => {
  const navigate = useNavigate();

  const [cutiData, setCutiData] = useState([
    {
      tanggalPengajuan: "15/10/2024",
      nama: "Karyawan 1",
      idKaryawan: "112423",
      jabatan: "Admin",
      status: "Diterima",
    },
    {
      tanggalPengajuan: "13/10/2024",
      nama: "Karyawan 2",
      idKaryawan: "527310",
      jabatan: "Perawat",
      status: "Diterima",
    },
    {
      tanggalPengajuan: "12/10/2024",
      nama: "Karyawan 3",
      idKaryawan: "207587",
      jabatan: "Farmasi",
      status: "Ditolak",
    },
    {
      tanggalPengajuan: "07/10/2024",
      nama: "Karyawan 4",
      idKaryawan: "147599",
      jabatan: "Bidan",
      status: "Diterima",
    },
    // ... tambahkan data lebih banyak untuk mencapai 30 entri
  ]);

  const [entriesToShow, setEntriesToShow] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Menampilkan 5 entri per halaman
  const maxEntries = 30; // Total entri maksimal

  const handleViewClick = (data) => {
    navigate("/cuti/view", { state: { selectedCuti: data } });
  };

  const handleExport = () => {
    alert("Export functionality is not implemented yet.");
  };

  const handleAccept = (idKaryawan) => {
    setCutiData((prevData) =>
      prevData.map((data) =>
        data.idKaryawan === idKaryawan ? { ...data, status: "Diterima" } : data
      )
    );
  };

  const handleReject = (idKaryawan) => {
    setCutiData((prevData) =>
      prevData.map((data) =>
        data.idKaryawan === idKaryawan ? { ...data, status: "Ditolak" } : data
      )
    );
  };

  const filteredData = cutiData.filter((data) =>
    data.nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(
    Math.min(maxEntries, filteredData.length) / itemsPerPage
  );
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
            <a href="/karyawan">
              <FontAwesomeIcon icon={faUsers} /> Kehadiran Karyawan
            </a>
          </li>
          <li>
            <a className="active" href="/cuti">
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
          <h2>Cuti Karyawan</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="content">
          <div className="top-controls">
            <div className="show-entries">
              <label>Show entries: </label>
              <select
                value={entriesToShow}
                onChange={(e) => setEntriesToShow(parseInt(e.target.value))}
              >
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
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <button className="export-button" onClick={handleExport}>
              Export
            </button>
          </div>

          <div className="cuti-table">
            <table>
              <thead>
                <tr>
                  <th>Tanggal Pengajuan</th>
                  <th>Nama</th>
                  <th>ID Karyawan</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.tanggalPengajuan}</td>
                    <td>{data.nama}</td>
                    <td>{data.idKaryawan}</td>
                    <td>{data.jabatan}</td>
                    <td>
                      <span
                        className={`status-indicator ${
                          data.status === "Diterima" ? "accepted" : "rejected"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-button accept"
                        onClick={() => handleAccept(data.idKaryawan)}
                      >
                        Terima
                      </button>
                      <button
                        className="action-button reject"
                        onClick={() => handleReject(data.idKaryawan)}
                      >
                        Tolak
                      </button>
                    </td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewClick(data)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`page-number ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuti;
