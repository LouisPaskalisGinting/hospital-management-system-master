import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/static/Cuti.css";
import { CutiRepository } from "../data/repository/CutiRepository";
import { formatDate } from "../util/DateFormatter";
import Sidebar from "./Sidebar";

const Cuti = () => {
  const navigate = useNavigate();
  const cutiRepository = new CutiRepository();

  const [cutiData, setCutiData] = useState([]);

  const fetchCuti = async () => {
    const data = await cutiRepository.fetchCuti();
    setCutiData(data);
  };

  useEffect(() => {
    fetchCuti();
  }, []);

  const handleViewClick = (data) => {
    // Navigasi ke halaman CutiView dengan mengirim data cuti yang dipilih
    navigate("/cuti/view", { state: { selectedCuti: data } });
  };

  const handleAllowClicked = async (data) => {
    // Permintaan cuti yang dipilih untuk di terima
    await cutiRepository.allowCuti(data.uuid);
    fetchCuti();
  };

  const handleDenyClicked = (data) => {
    // Permintaan cuti yang dipilih untuk di tolak
    cutiRepository.denyCuti(data.uuid);
    fetchCuti();
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        <div className="flex bg-white w-full p-4 justify-start">
          <span className="text-2xl font-bold text-start">Cuti Karyawan</span>
        </div>

        <div className="attendance-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Tanggal Pengajuan</th>
                <th>Nama</th>
                <th>ID Karyawan</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Aksi</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {cutiData.map((data, index) => (
                <tr key={index}>
                  <td>{formatDate(data.createdAt.toDate())}</td>
                  <td>{data.username}</td>
                  <td>{data.userId}</td>
                  <td>{data.role}</td>
                  <td>
                    <button className="bg-white px-4 py-1 border border-blue-500 rounded-lg">
                      {data.status}
                    </button>
                  </td>
                  <td>
                    {(data.status === "Menunggu" && (
                      <div className="flex flex-row gap-2">
                        <button
                          onClick={() => handleAllowClicked(data)}
                          className="bg-green-400 px-4 py-1 border border-blue-500 rounded-lg"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleDenyClicked(data)}
                          className="bg-red-300 px-4 py-1 border border-blue-500 rounded-lg"
                        >
                          Tolak
                        </button>
                      </div>
                    )) || <span>Tidak ada aksi</span>}
                  </td>
                  <td>
                    <button
                      className="bg-white px-4 py-1 border border-blue-500 rounded-lg"
                      onClick={() => handleViewClick(data)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cuti;
