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
import Sidebar from "./Sidebar";
import { ObatRepository } from "../data/repository/ObatRepository";
import { HistoryObatRepository } from "../data/repository/HistoryObatRepository";

const Obat = () => {
  const obatRepository = new ObatRepository();
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan data dari navigasi
  const [search, setSearch] = useState("");
  const [obatData, setObatData] = useState([]);

  useEffect(() => {
    const fetchObat = async () => {
      const data = await obatRepository.fetchObat();
      setObatData(
        data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    };
    fetchObat();
  }, [search]);

  const handleAddClicked = () => {
    navigate("/TambahObat");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Menghapus obat
  const handleHapusObat = (id) => {
    obatRepository.deleteObat(id);
    setObatData(obatData.filter((obat) => obat.id !== id));
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
      <Sidebar />

      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Daftar Obat
          </h2>
          <h2 className="text-start px-10 text-2xl font-bold">
            Obat yang tersedia di klinik
          </h2>
          <div className="mx-10 bg-white p-4 rounded-lg">
            <div className="gap-2">
              <div className="flex flex-row justify-between">
                <div>
                  <input
                    type="text"
                    placeholder="Search.."
                    className="bg-gray-50"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <div>
                  <button
                    onClick={handleAddClicked}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Tambah Obat Baru
                  </button>
                </div>
              </div>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Tanggal Masuk</th>
                    <th>Nama Obat</th>
                    <th>ID Obat</th>
                    <th>Jumlah</th>
                    <th>Atur stok</th>
                    <th>Detail</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {obatData.map((obat, index) => (
                    <tr key={index}>
                      <td>{obat.createdAt}</td>
                      <td>{obat.name}</td>
                      <td>{obat.id}</td>
                      <td>{obat.stock}</td>
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
                          onClick={() => handleEditObat(obat.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="hapus-btn"
                          onClick={() => handleHapusObat(obat.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Obat;