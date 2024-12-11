import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoklinik2.png";
import "../assets/static/TambahGaji.css";

const TambahGaji = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    position: "",
    salary: 0,
    allowance: 0,
    incentive: 0,
    month: "",
    status: "Belum",
  });

  const [totalGaji, setTotalGaji] = useState(0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const numericValue =
      id === "salary" || id === "allowance" || id === "incentive"
        ? Number(value) || 0
        : value;
    const updatedFormData = { ...formData, [id]: numericValue };
    setFormData(updatedFormData);

    // Update total gaji
    const { salary, allowance, incentive } = updatedFormData;
    setTotalGaji(Number(salary) + Number(allowance) + Number(incentive));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payroll", { state: { dataGajiBaru: formData } });
  };
  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    navigate("/payroll");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2> Payroll</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div>
          <h2>Tambah Data Gaji</h2>
          <form onSubmit={handleSubmit}>
            <input id="name" placeholder="Nama" onChange={handleChange} />
            <input
              id="employeeId"
              placeholder="ID Karyawan"
              onChange={handleChange}
            />
            <input
              id="position"
              placeholder="Jabatan"
              onChange={handleChange}
            />
            <input
              id="salary"
              placeholder="Gaji Pokok"
              type="number"
              onChange={handleChange}
            />
            <input
              id="allowance"
              placeholder="Tunjangan"
              type="number"
              onChange={handleChange}
            />
            <input
              id="incentive"
              placeholder="Insentif"
              type="number"
              onChange={handleChange}
            />
            <select id="month" onChange={handleChange}>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
            <button type="submit">Save</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => handleCancel("/obat")}
            >
              Cancel
            </button>
          </form>
          <div>
            <h3>Total Gaji: Rp {totalGaji.toLocaleString("id-ID")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahGaji;
