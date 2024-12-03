import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/static/Obat.css";
import logo from "../assets/img/logoklinik2.png";

const Obat = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan data dari navigasi
  const [obatData, setObatData] = useState([
    {
      tanggalMasuk: "12/10/2024",
      namaObat: "Amoxicillin",
      idObat: "D06ID2324",
      stokTersedia: 154,
    },
    {
      tanggalMasuk: "12/10/2024",
      namaObat: "Paracetamol",
      idObat: "D06ID2325",
      stokTersedia: 120,
    },
    {
      tanggalMasuk: "12/10/2024",
      namaObat: "Ibuprofen",
      idObat: "D06ID2326",
      stokTersedia: 85,
    },
    {
      tanggalMasuk: "12/10/2024",
      namaObat: "Asam Mefenamat",
      idObat: "D06ID2327",
      stokTersedia: 75,
    },
  ]);

  // Menghapus obat
  const handleHapusObat = (idObat) => {
    setObatData(obatData.filter((obat) => obat.idObat !== idObat));
  };

  // Menangani data obat baru yang ditambahkan dari halaman TambahObat
  useEffect(() => {
    if (location.state?.obatBaru) {
      setObatData((prevData) => [...prevData, location.state.obatBaru]);
      navigate("/obat", { replace: true }); // Reset state setelah menambahkan
    }
  }, [location.state, navigate]);

  // Menangani data obat yang diperbarui dari halaman EditObat
  useEffect(() => {
    if (location.state?.obatEdit) {
      setObatData((prevData) =>
        prevData.map((obat) =>
          obat.idObat === location.state.obatEdit.idObat
            ? location.state.obatEdit
            : obat
        )
      );
      navigate("/obat", { replace: true }); // Reset state setelah pembaruan
    }
  }, [location.state, navigate]);

  // Mengarahkan ke halaman EditObat dengan data obat
  const handleEditObat = (obat) => {
    navigate("/EditObat", { state: { obat } });
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

      <div className="main-content">
        <header className="header">
          <h2>Daftar Obat</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>
        <main className="dashboard-content">
          <div className="obat-container">
            <h2>Obat yang tersedia di klinik</h2>
            <button
              className="tambah-obat-btn"
              onClick={() => navigate("/TambahObat")}
            >
              Tambah Obat Baru
            </button>
            <table className="obat-table">
              <thead>
                <tr>
                  <th>Tanggal Masuk</th>
                  <th>Nama Obat</th>
                  <th>ID Obat</th>
                  <th>Stok tersedia</th>
                  <th>Atur stok</th>
                  <th>Detail</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {obatData.map((obat, index) => (
                  <tr key={index}>
                    <td>{obat.tanggalMasuk}</td>
                    <td>{obat.namaObat}</td>
                    <td>{obat.idObat}</td>
                    <td>{obat.stokTersedia}</td>
                    <td>
                      <button
                        className="kelola-stok-btn"
                        onClick={() =>
                          navigate("/KelolaStok", { state: { obat } })
                        }
                      >
                        Kelola stok
                      </button>
                    </td>
                    <td>
                      <button
                        className="detail-btn"
                        onClick={() =>
                          navigate("/DetailObat", { state: { obat } })
                        }
                      >
                        Detail Obat
                      </button>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditObat(obat)}
                      >
                        Edit
                      </button>
                      <button
                        className="hapus-btn"
                        onClick={() => handleHapusObat(obat.idObat)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Obat;
