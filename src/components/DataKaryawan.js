import React, { useState, useEffect } from "react";
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
import logo from "../assets/img/logoklinik2.png";

const DataKaryawan = () => {
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

  // State untuk form tambah atau edit
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const [newEmployeePosition, setNewEmployeePosition] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    handleFilter();
  }, [search, employees]);

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
      id: isEditing ? editEmployeeId : newEmployeeId,
      name: newEmployeeName,
      position: newEmployeePosition,
    };

    if (isEditing) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editEmployeeId ? newEmployee : employee
      );
      setEmployees(updatedEmployees);
      setIsEditing(false);
    } else {
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
    }

    setNewEmployeeName("");
    setNewEmployeeId("");
    setNewEmployeePosition("");
    setEditEmployeeId(null);
    setShowPopup(false);
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setNewEmployeeId(employee.id);
      setNewEmployeeName(employee.name);
      setNewEmployeePosition(employee.position);
      setEditEmployeeId(employee.id);
      setIsEditing(true);
      setShowPopup(true);
    }
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
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

      <div className="content">
        <header className="header">
          <h2>Data Karyawan</h2>
        </header>
        <div className="filter">
          <label>Filter: </label>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="add-button" onClick={() => setShowPopup(true)}>
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
              currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.id}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditEmployee(employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      Hapus
                    </button>
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{isEditing ? "Edit Data Karyawan" : "Tambah Karyawan Baru"}</h2>
            <div>
              <label>ID Karyawan</label>
              {isEditing ? (
                <div>{newEmployeeId}</div>
              ) : (
                <input
                  type="number"
                  placeholder="Masukkan ID Karyawan"
                  value={newEmployeeId}
                  onChange={(e) => setNewEmployeeId(e.target.value)}
                />
              )}
            </div>
            <div>
              <label>Nama Karyawan</label>
              <input
                type="text"
                placeholder="Masukkan Nama Karyawan"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
              />
            </div>
            <div>
              <label>Jabatan</label>
              <select
                value={newEmployeePosition}
                onChange={(e) => setNewEmployeePosition(e.target.value)}
              >
                <option value="">Pilih Jabatan</option>
                <option value="Admin">Admin</option>
                <option value="Perawat">Perawat</option>
                <option value="Farmasi">Farmasi</option>
                <option value="Bidan">Bidan</option>
              </select>
            </div>
            <button onClick={handleAddEmployee}>
              {isEditing ? "Simpan" : "Tambahkan"}
            </button>
            <button
              onClick={() => {
                setShowPopup(false);
                setIsEditing(false);
              }}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataKaryawan;
