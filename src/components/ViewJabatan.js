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
import "../assets/static/ViewJabatan.css";
import logo from "../assets/img/logoklinik2.png";

const ViewJabatan = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(6);
  const [data, setData] = useState([
    { id: 1, nama: "Perawat", gajiPokok: 5000000, tunjangan: 1000000 },
    { id: 2, nama: "Admin", gajiPokok: 4500000, tunjangan: 500000 },
    { id: 3, nama: "Apoteker", gajiPokok: 4500000, tunjangan: 500000 },
    { id: 4, nama: "Dokter Umum", gajiPokok: 7000000, tunjangan: 1500000 },
    { id: 5, nama: "Fisioterapis", gajiPokok: 5000000, tunjangan: 1500000 },
    { id: 6, nama: "Receptionist", gajiPokok: 3000000, tunjangan: 500000 },
    { id: 7, nama: "Analis Lab", gajiPokok: 4000000, tunjangan: 500000 },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    nama: "",
    gajiPokok: "",
    tunjangan: "",
  });
  const [editJob, setEditJob] = useState({
    id: null,
    nama: "",
    gajiPokok: "",
    tunjangan: "",
  });

  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle Entries Change
  const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value));
  };

  // Filter and Paginate Data
  const filteredData = data
    .filter((item) => item.nama.toLowerCase().includes(search.toLowerCase()))
    .slice(0, entries);

  // Add Job Popup
  const toggleAddPopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setNewJob({ nama: "", gajiPokok: "", tunjangan: "" });
  };

  // Edit Job Popup
  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
    setEditJob({ id: null, nama: "", gajiPokok: "", tunjangan: "" });
  };

  // Save New Job
  const handleSaveNewJob = () => {
    if (newJob.nama.trim() && newJob.gajiPokok > 0 && newJob.tunjangan > 0) {
      const newData = {
        id: data.length + 1,
        nama: newJob.nama,
        gajiPokok: parseInt(newJob.gajiPokok),
        tunjangan: parseInt(newJob.tunjangan),
      };
      setData([...data, newData]);
      toggleAddPopup();
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

  // Edit Job
  const handleEdit = (job) => {
    setEditJob(job);
    setIsEditPopupOpen(true);
  };

  // Save Edited Job
  const handleSaveEditJob = () => {
    if (editJob.nama.trim() && editJob.gajiPokok > 0 && editJob.tunjangan > 0) {
      setData(
        data.map((item) =>
          item.id === editJob.id
            ? {
                ...item,
                nama: editJob.nama,
                gajiPokok: parseInt(editJob.gajiPokok),
                tunjangan: parseInt(editJob.tunjangan),
              }
            : item
        )
      );
      toggleEditPopup();
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

  // Delete Job
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id !== id));
    }
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
            <a className="active" href="/jabatan">
              <FontAwesomeIcon icon={faUsers} /> Jabatan
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
        <header>
          <h1>Data Jabatan Klinik</h1>
        </header>

        <div className="controls">
          <div className="entries">
            Show
            <select value={entries} onChange={handleEntriesChange}>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="10">10</option>
            </select>
            Entries
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <button className="add-button" onClick={toggleAddPopup}>
            Tambah Jabatan
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Jabatan</th>
              <th>Gaji Pokok</th>
              <th>Tunjangan Kerja</th>
              <th>Total Gaji</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>Rp. {item.gajiPokok.toLocaleString()}</td>
                <td>Rp. {item.tunjangan.toLocaleString()}</td>
                <td>
                  Rp. {(item.gajiPokok + item.tunjangan).toLocaleString()}
                </td>
                <td>
                  <button className="edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup Add */}
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Tambah Data Jabatan</h2>
              <form>
                <label>
                  Nama Jabatan:
                  <input
                    type="text"
                    value={newJob.nama}
                    placeholder="Masukkan nama jabatan"
                    onChange={(e) =>
                      setNewJob({ ...newJob, nama: e.target.value })
                    }
                  />
                </label>
                <label>
                  Gaji Pokok:
                  <input
                    type="number"
                    placeholder="Masukkan gaji pokok"
                    min="0"
                    value={newJob.gajiPokok}
                    onChange={(e) =>
                      setNewJob({ ...newJob, gajiPokok: e.target.value })
                    }
                  />
                </label>
                <label>
                  Tunjangan Kerja:
                  <input
                    type="number"
                    placeholder="Masukkan tunjangan kerja"
                    min="0"
                    value={newJob.tunjangan}
                    onChange={(e) =>
                      setNewJob({ ...newJob, tunjangan: e.target.value })
                    }
                  />
                </label>
              </form>
              <div className="popup-actions">
                <button className="cancel-button" onClick={toggleAddPopup}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSaveNewJob}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup Edit */}
        {isEditPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Edit Data Jabatan</h2>
              <form>
                <label>
                  Nama Jabatan:
                  <input
                    type="text"
                    value={editJob.nama}
                    placeholder="Masukkan nama jabatan"
                    onChange={(e) =>
                      setEditJob({ ...editJob, nama: e.target.value })
                    }
                  />
                </label>
                <label>
                  Gaji Pokok:
                  <input
                    type="number"
                    placeholder="Masukkan gaji pokok"
                    min="0"
                    value={editJob.gajiPokok}
                    onChange={(e) =>
                      setEditJob({ ...editJob, gajiPokok: e.target.value })
                    }
                  />
                </label>
                <label>
                  Tunjangan Kerja:
                  <input
                    type="number"
                    placeholder="Masukkan tunjangan kerja"
                    min="0"
                    value={editJob.tunjangan}
                    onChange={(e) =>
                      setEditJob({ ...editJob, tunjangan: e.target.value })
                    }
                  />
                </label>
              </form>
              <div className="popup-actions">
                <button className="cancel-button" onClick={toggleEditPopup}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSaveEditJob}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJabatan;
