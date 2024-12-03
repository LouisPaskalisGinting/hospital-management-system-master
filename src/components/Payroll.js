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
import "../assets/static/Payroll.css";
import logo from "../assets/img/logoklinik2.png";
import { useNavigate } from "react-router-dom"; // Perbaikan di sini

const Payroll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); // Menginisialisasi useNavigate

  const payrollData = [
    {
      id: 1,
      name: "Karyawan 1",
      employeeId: "112423",
      position: "Perawat",
      salary: 5000000,
      allowance: 1000000,
    },
    {
      id: 2,
      name: "Karyawan 2",
      employeeId: "527310",
      position: "Admin",
      salary: 5000000,
      allowance: 500000,
    },
    {
      id: 3,
      name: "Karyawan 3",
      employeeId: "112424",
      position: "Apoteker",
      salary: 4500000,
      allowance: 500000,
    },
    // Data lainnya
  ];

  const totalPages = Math.ceil(payrollData.length / entriesPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredData = payrollData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.includes(searchQuery) ||
      item.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrint = () => {
    alert("Fitur Cetak Daftar Gaji belum diimplementasikan.");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-menu">
          {/* Sidebar Items */}
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

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <h1>Data Gaji Karyawan Klinik</h1>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>
        <section className="payroll-section">
          <div className="payroll-controls">
            <input
              type="text"
              className="search-box"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <select
              className="entries-select"
              value={entriesPerPage}
              onChange={handleEntriesChange}
            >
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button className="cetak-button" onClick={handlePrint}>
              Cetak Daftar Gaji
            </button>
          </div>

          <table className="payroll-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>ID Karyawan</th>
                <th>Jabatan</th>
                <th>Gaji Pokok</th>
                <th>Tunjangan Kerja</th>
                <th>Total Gaji</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.employeeId}</td>
                  <td>{item.position}</td>
                  <td>Rp. {item.salary.toLocaleString()}</td>
                  <td>Rp. {item.allowance.toLocaleString()}</td>
                  <td>Rp. {(item.salary + item.allowance).toLocaleString()}</td>
                  <td>
                    <button
                      className="detail-button"
                      onClick={
                        () =>
                          navigate("/DetailGaji", { state: { payroll: item } }) // Kirim data ke DetailGaji
                      }
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1 ? "active-page" : "page-button"
                }
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payroll;
