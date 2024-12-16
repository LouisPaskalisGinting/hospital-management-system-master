import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoklinik2.png";
import "../assets/static/ViewObat.css";

const obatData = [
  "Amoxicillin",
  "Paracetamol",
  "Ibuprofen",
  "Asam Mefenamat",
  "Metformin",
  "Dexamethasone",
  "Vitamin B Kompleks",
  "Vitamin C",
  "Antasida",
  "Amlodipine",
  "Clindamycin",
  "Ciprofloxacin",
  "Aspirin",
  "Omeprazole",
  "Lansoprazole",
  "Simvastatin",
  "Atorvastatin",
  "Prednisone",
  "Hydrocortisone",
  "Diclofenac",
];

const itemsPerPage = 10;

const ViewObat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Filter data obat berdasarkan nama yang cocok dengan search term
  const filteredObat = obatData.filter((obat) =>
    obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredObat.length / itemsPerPage);

  // Tentukan data obat yang akan ditampilkan pada halaman saat ini
  const currentItems = filteredObat.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset halaman ke 1 setiap kali pencarian berubah
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
        <header className="content-header">
          <h2>Obat yang tersedia</h2>
          <p className="sub-header">
            Jenis Obat saat ini ({filteredObat.length})
          </p>
        </header>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="filter-button">Filter</button>
        </div>

        <table className="obat-table">
          <thead>
            <tr>
              <th>Nama Obat</th>
              <th>Stok tersedia</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((namaObat, index) => (
              <tr key={index}>
                <td>{namaObat}</td>
                <td>{Math.floor(Math.random() * 100) + 20}</td>{" "}
                {/* Contoh stok */}
                <td>
                  <button className="detail-button">Detail Obat</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            onClick={goToNextPage}
            className="pagination-button"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewObat;