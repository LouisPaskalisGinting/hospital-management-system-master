import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/KelolaStok.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoklinik2.png";

const KelolaStok = ({ laporan, setLaporan }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { obat } = location.state || {}; // Terima data obat dari navigasi

  // Ambil data sisa stok lama
  const [jumlahMasuk, setJumlahMasuk] = useState(0); // Jumlah masuk default 0
  const [jumlahKeluar, setJumlahKeluar] = useState(0);
  const [sisaStok, setSisaStok] = useState(obat?.stokTersedia || 0); // Sisa stok mengikuti data lama
  const [keterangan, setKeterangan] = useState(""); // Tambahkan state untuk keterangan
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State untuk kontrol pop-up

  const updateSisaStok = (newJumlahMasuk, newJumlahKeluar) => {
    const stokAwal = obat?.stokTersedia || 0; // Gunakan stok tersedia lama
    const stokBaru = stokAwal + newJumlahMasuk - newJumlahKeluar;
    setSisaStok(Math.max(stokBaru, 0)); // Hindari nilai negatif
  };

  const handleJumlahMasukChange = (value) => {
    const numericValue = Number(value) || 0;
    setJumlahMasuk(numericValue);
    updateSisaStok(numericValue, jumlahKeluar);
  };

  const handleJumlahKeluarChange = (value) => {
    const numericValue = Number(value) || 0;
    setJumlahKeluar(numericValue);
    updateSisaStok(jumlahMasuk, numericValue);
  };

  const handleSave = () => {
    // Validasi data
    if (jumlahKeluar > sisaStok) {
      alert("Jumlah keluar tidak boleh lebih besar dari stok tersedia.");
      return;
    }

    // Tambahkan data ke laporan
    const newLaporan = {
      tanggal: new Date().toLocaleDateString("id-ID"),
      keteranganStok: jumlahMasuk > 0 ? "Masuk" : "Keluar",
      jumlahStok: jumlahMasuk > 0 ? jumlahMasuk : jumlahKeluar,
      keteranganLanjutan: keterangan,
    };
    setLaporan([...laporan, newLaporan]);

    // Menampilkan pop-up setelah data disimpan
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    navigate("/obat");
  };

  const handlePopupContinue = () => {
    setIsPopupOpen(false);
    navigate("/obat"); // Navigasi ke halaman obat setelah melanjutkan
  };

  const handlePopupCancel = () => {
    setIsPopupOpen(false); // Menutup pop-up tanpa melanjutkan
  };

  if (!obat) {
    return <div>Data obat tidak ditemukan!</div>;
  }

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
          <h2>Data Obat</h2>
          <div className="profile-section">
            <span>Admin</span>
            <div className="profile-icon">A</div>
          </div>
        </header>

        <div className="kelola-stok-container">
          <h2 className="kelola-stok-title">
            Manajemen Stok Obat: {obat.namaObat}
          </h2>
          <div className="kelola-stok-form">
            <div className="form-group">
              <label>Sisa Stok Awal</label>
              <input
                type="number"
                value={obat.stokTersedia || 0}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Jumlah Masuk</label>
              <input
                type="number"
                value={jumlahMasuk}
                onChange={(e) =>
                  handleJumlahMasukChange(e.target.value)
                }
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Jumlah Keluar</label>
              <input
                type="number"
                value={jumlahKeluar}
                onChange={(e) =>
                  handleJumlahKeluarChange(e.target.value)
                }
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Sisa Stok Obat</label>
              <input
                type="number"
                value={sisaStok}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Keterangan</label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Masukkan alasan perubahan stok"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="kelola-stok-actions">
              <button className="btn cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Konfirmasi */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>✔️</p>
            <p>Berhasil</p>
            <p>Stok Obat Berhasil Diperbarui</p>
            <div className="popup-actions">
              <button className="continue-btn" onClick={handlePopupContinue}>
                Continue
              </button>
              <button className="cancel-btn" onClick={handlePopupCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaStok;
