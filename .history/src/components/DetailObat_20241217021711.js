import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation
import "../assets/static/Detailobat.css";
import { HistoryObatRepository } from "../data/repository/HistoryObatRepository";
import logo from "../assets/img/logoklinik2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const DataObat = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const location = useLocation(); // Gunakan useLocation untuk menerima state
  const { obat } = location.state || {}; // Ambil data obat dari state
  const [historyObatData, setHistoryObatData] = useState([]);
  const [sisa, setSisa] = useState(obat?.stock || 0);

  const handleKembali = () => {
    navigate("/obat"); // Kembali ke halaman Obat
  };
  

  useEffect(() => {  
    const cekSisa = async (value = obat.name) => {
      try {
        const historyObat = new HistoryObatRepository();
        let sisa = await historyObat.cekSisaObat(value);
        setSisa(sisa);
      } catch (error) {
        console.log(error);
      }
    };
    cekSisa(obat.name);
  }, [sisa]);

  useEffect(() => {
    const fetchHistoryObat = async () => {
      try {
        const historyObat = new HistoryObatRepository();
        const allHistory = await historyObat.fetchObat(obat.name);
        setHistoryObatData(allHistory);
      } catch (error) {
        console.error('Error fetching payroll count:', error);
      }
    };

    fetchHistoryObat();
  }, [historyObatData]); 

  if (!obat) {
    return <div>Data obat tidak ditemukan!</div>;
  }
  // (async () => {
  //   const payrollRepository = new HistoryObatRepository();
    
  //   try {
  //     const allUsers = await payrollRepository.fetchObat();
  //     const userCount = allUsers.length;
      
  //     console.log("ini obat",allUsers);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // })();

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
            <div className="gap-2">
            <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Tanggal Keluar</th>
                    <th>Nama Obat</th>
                    <th>ID Obat</th>
                    <th>Jumlah</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  { historyObatData.map((obat, index) => (
                    <tr key={index}>
                      <td>{obat.createdAt}</td>
                      <td>{obat.name}</td>
                      <td>{obat.id}</td>
                      <td>{obat.jumlah_keluar}</td>
                      
                      <td>
                        <button
                          className="edit-btn"
                          // onClick={() => handleEditObat(obat)}
                        >
                          Edit
                        </button>
                        <button
                          className="hapus-btn"
                          // onClick={() => handleHapusObat(obat.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gap-2">
              <div className="kolom-obat">
                <label className="text-start">Tanggal Masuk</label>
                <input type="text" value={obat.createdAt} readOnly />
              </div>
              <div className="kolom-obat">
                <label className="text-start">Nama Obat</label>
                <input type="text" value={obat.name} readOnly />
              </div>
              <div className="kolom-obat">
                <label className="text-start">ID Obat</label>
                <input type="text" value={obat.id} readOnly />
              </div>
              <div className="kolom-obat">
                <label className="text-start">Stok Obat</label>
                <input type="text" value={obat.stock - sisa} readOnly />
              </div>
              <button className="tombol-kembali" onClick={handleKembali}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataObat;