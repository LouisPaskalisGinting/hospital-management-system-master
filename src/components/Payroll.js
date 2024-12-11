import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      name: "Karyawan 1",
      employeeId: "112423",
      position: "Perawat",
      salary: 5000000,
      allowance: 500000,
      incentive: 500000,
      month: "Januari",
      status: "Diambil",
    },
    {
      id: 2,
      name: "Karyawan 2",
      employeeId: "527310",
      position: "Admin",
      salary: 4000000,
      allowance: 250000,
      incentive: 250000,
      month: "Februari",
      status: "Belum",
    },
    {
      id: 3,
      name: "Karyawan 3",
      employeeId: "121231",
      position: "Farmasi",
      salary: 3000000,
      allowance: 150000,
      incentive: 150000,
      month: "Februari",
      status: "Diambil",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Cek data baru dari navigasi
  useEffect(() => {
    if (location.state && location.state.dataGajiBaru) {
      const newPayroll = location.state.dataGajiBaru;
      setPayrollData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...newPayroll },
      ]);
      navigate("/payroll", { replace: true }); // Hapus state setelah diterima
    }
  }, [location.state, navigate]);

  // Total halaman
  const totalPages = Math.ceil(
    payrollData.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.employeeId.includes(searchQuery) ||
          item.position.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterMonth === "" || item.month === filterMonth)
    ).length / entriesPerPage
  );

  // Filter data berdasarkan pencarian dan bulan
  const filteredData = payrollData.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.employeeId.includes(searchQuery) ||
        item.position.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterMonth === "" || item.month === filterMonth)
  );

  // Pagination data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Handler pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handler filter bulan
  const handleFilterMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setFilterMonth(selectedMonth === "ALL" ? "" : selectedMonth);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  // Handler jumlah entri per halaman
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Navigasi ke halaman tambah data gaji
  const handleAddData = () => {
    navigate("/TambahGaji");
  };

  // Navigasi ke halaman detail gaji
  const handleDetail = (item) => {
    navigate("/DetailGaji", { state: { payroll: item } });
  };

  // Fitur cetak daftar gaji
  const handlePrint = () => {
    alert("Fitur Cetak Daftar Gaji belum diimplementasikan.");
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

      <main className="content">
        <header className="header">
          <h1>Data Gaji Karyawan Klinik</h1>
        </header>
        <section className="payroll-section">
          <div className="payroll-controls">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select value={filterMonth} onChange={handleFilterMonthChange}>
              <option value="ALL">Semua Bulan</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>

            <select value={entriesPerPage} onChange={handleEntriesChange}>
              <option value={6}>6</option>
              <option value={10}>10</option>
            </select>
            <button className="cetak-btn" onClick={handlePrint}>
              Cetak Daftar Gaji
            </button>
            <button className="tambah-btn" onClick={handleAddData}>
              Tambah Data Gaji
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
                <th>Insentif</th>
                <th>Total Gaji</th>
                <th>Bulan</th>
                <th>Status</th>
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
                  <td>Rp. {item.incentive.toLocaleString()}</td>
                  <td>
                    Rp.{" "}
                    {(
                      item.salary +
                      item.allowance +
                      item.incentive
                    ).toLocaleString()}
                  </td>
                  <td>{item.month}</td>
                  <td
                    className={
                      item.status === "Diambil"
                        ? "status-taken"
                        : "status-pending"
                    }
                  >
                    {item.status}
                  </td>
                  <td>
                    <button
                      className="detail-button"
                      onClick={() => handleDetail(item)}
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
                onClick={() => setCurrentPage(index + 1)}
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
