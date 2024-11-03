import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faMoneyCheckAlt,
  faClipboardCheck,
  faPills,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/static/DataKaryawan.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    { id: 112423, name: "Karyawan 1", position: "Admin" },
    { id: 527310, name: "Karyawan 2", position: "Perawat" },
    { id: 207587, name: "Karyawan 3", position: "Farmasi" },
    { id: 147599, name: "Karyawan 4", position: "Bidan" },
    { id: 589087, name: "Karyawan 5", position: "Perawat" },
    { id: 741289, name: "Karyawan 6", position: "Bidan" },
  ]);

  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State for the form (new or edit)
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const [newEmployeePosition, setNewEmployeePosition] = useState("");
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = () => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const handleAddEmployee = () => {
    if (
      !newEmployeeName ||
      (!newEmployeeId && !isEditing) ||
      !newEmployeePosition
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newEmployee = {
      id: newEmployeeId,
      name: newEmployeeName,
      position: newEmployeePosition,
    };

    if (isEditing) {
      // Update the existing employee
      const updatedEmployees = [...employees];
      updatedEmployees[editEmployeeIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      setIsEditing(false);
    } else {
      // Add new employee
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    }

    setNewEmployeeName("");
    setNewEmployeeId("");
    setNewEmployeePosition("");
    setShowPopup(false);
  };

  const handleEditEmployee = (index) => {
    const employee = employees[index];
    setNewEmployeeId(employee.id);
    setNewEmployeeName(employee.name);
    setNewEmployeePosition(employee.position);
    setEditEmployeeIndex(index);
    setIsEditing(true);
    setShowPopup(true);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <div className="content">
        <h2>Data Karyawan</h2>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="filter-button" onClick={handleFilter}>
            Filter
          </button>
          <button
            className="add-button"
            onClick={() => {
              setIsEditing(false);
              setNewEmployeeId("");
              setShowPopup(true);
            }}
          >
            Tambah Karyawan
          </button>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>ID Karyawan</th>
              <th>Jabatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.id}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditEmployee(index)}
                    >
                      Edit
                    </button>
                    <button className="delete-button">Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`page-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Popup for Add/Edit Employee */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>
                {isEditing ? "Edit Data Karyawan" : "Tambah Karyawan Baru"}
              </h2>
              <button
                className="close-button"
                onClick={() => {
                  setShowPopup(false);
                  setIsEditing(false);
                }}
              >
                &times;
              </button>
            </div>
            {/* ID Karyawan field */}
            <div>
              <label>ID Karyawan</label>
              {isEditing ? (
                // Tampilkan ID sebagai teks saja saat mengedit
                <div className="id-display">{newEmployeeId}</div>
              ) : (
                // Tampilkan input ID saat menambah karyawan baru
                <input
                  type="number"
                  placeholder="Masukkan ID Karyawan"
                  value={newEmployeeId}
                  onChange={(e) => setNewEmployeeId(e.target.value)}
                />
              )}
            </div>
            {/* Nama Karyawan field */}
            <div>
              <label>Nama Karyawan</label>
              <input
                type="text"
                placeholder="Masukkan Nama Karyawan"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
              />
            </div>
            {/* Jabatan field */}
            <div>
              <label>Jabatan</label>
              <input
                type="text"
                placeholder="Masukkan Jabatan"
                value={newEmployeePosition}
                onChange={(e) => setNewEmployeePosition(e.target.value)}
              />
            </div>
            <button className="submit-button" onClick={handleAddEmployee}>
              {isEditing ? "Simpan" : "Tambahkan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
