import React, { useState,useEffect } from "react";
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
import Sidebar from "./Sidebar";
import { ObatRepository } from "../data/repository/ObatRepository";
import { HistoryObatRepository } from "../data/repository/HistoryObatRepository";

const KelolaStok = () => {
  const obatRepository = new ObatRepository();
  const historyObatRepository = new HistoryObatRepository();
  const navigate = useNavigate();
  const location = useLocation();
  const { obat } = location.state || {}; // Terima data obat dari navigasi
  const [tanggalMasuk] = useState(obat?.createdAt || "N/A");
  const [tanggalKeluar, settanggalKeluar] = useState(new Date().toLocaleDateString());
  const [jumlahMasuk] = useState(obat?.stock || 0);
  const [sisa, setSisa] = useState(obat?.stock || 0);
  const [jumlahKeluar, setJumlahKeluar] = useState(0);
  const [sisaStok, setSisaStok] = useState(jumlahMasuk);
  const [keterangan, setKeterangan] = useState(""); // Tambahkan state untuk keterangan

  const handleSave = async () => {
    try {
      await obatRepository.setObat({
        ...obat,
        stock: jumlahMasuk,
      });
      await historyObatRepository.setObat({
        id : obat.id,
        name : obat.name,
        createdAt : tanggalKeluar,
        updatedAt : new Date().toLocaleDateString(),
        jumlah_keluar: jumlahKeluar,
      });
      alert(
        `Data berhasil disimpan!\nNama Obat: ${obat.namaObat}\nJumlah Keluar: ${jumlahKeluar}\nSisa Stok: ${sisaStok}\nKeterangan: ${keterangan}`
      );
      navigate("/obat");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    navigate("/obat");
  };

  const cekSisa = async (value = obat.name) => {
    try {
      let sisa = await historyObatRepository.cekSisaObat(value);
      setSisa(sisa);
      // navigate("/obat");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {  
    cekSisa(obat.name);
  }, [sisa]);

  const handleJumlahKeluarChange = (value) => {
    setJumlahKeluar(value);
    setSisaStok(jumlahMasuk - value);
  };

  if (!obat) {
    return <div>Data obat tidak ditemukan!</div>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Data Obat
          </h2>
          <h2 className="text-start px-10 text-2xl font-bold">
            Detail Tentang Obat
          </h2>
          <div className="mx-10 bg-white p-4 rounded-lg">
            <div className="gap-2 text-start">
              <h2 className="kelola-stok-title">
                Manajemen Stok Obat: {obat.name}
              </h2>
              <div className="kelola-stok-form">
                <div className="form-group">
                  <label>Tanggal Masuk</label>
                  <input
                    type="text"
                    value={tanggalMasuk}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Tanggal Keluar</label>
                  <input
                    type="date"
                    onChange={(e) => settanggalKeluar(e.target.value)}
                    value={tanggalKeluar}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Jumlah Masuk</label>
                  <input
                    type="number"
                    value={jumlahMasuk}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Jumlah Keluar</label>
                  <input
                    type="number"
                    value={jumlahKeluar}
                    onChange={(e) =>
                      handleJumlahKeluarChange(Number(e.target.value))
                    }
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Sisa Stok Obat</label>
                  <input
                    type="number"
                    value={obat.stock - sisa}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Keterangan</label>
                  <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Masukkan alasan pengurangan obat"
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
        </div>
      </div>
    </div>
  );
};

export default KelolaStok;