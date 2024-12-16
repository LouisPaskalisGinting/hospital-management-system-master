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
import "../assets/static/TambahObat.css";
import Sidebar from "./Sidebar";
import { ObatRepository } from "../data/repository/ObatRepository";

const TambahObat = () => {
  const obatRepository = new ObatRepository();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    createdAt: new Date().toLocaleDateString(),
    name: "",
    id: "",
    stock: "",
  });

  // Handle input perubahan
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await obatRepository.setObat({
        ...formData,
        stock: parseInt(formData.stock),
      });
      navigate("/obat", { state: { obatBaru: formData } }); // Navigasi dengan data obat baru
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Data Obat
          </h2>
          <h2 className="text-start px-10 text-2xl font-bold">
            Tambah Data Obat Baru
          </h2>
          <div className="mx-10 bg-white p-4 rounded-lg">
            <div className="gap-2">
              <h3>Tambah Data Obat Baru</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group text-start">
                  <label htmlFor="createdAt">
                    Tanggal Masuk<span>*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="createdAt"
                      value={formData.createdAt}
                      readOnly
                    />
                    <i className="icon-calendar"></i>
                  </div>
                </div>

                <div className="form-group text-start">
                  <label htmlFor="name">
                    Nama Obat<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan Nama Obat"
                  />
                </div>

                <div className="form-group text-start">
                  <label htmlFor="id">
                    ID Obat<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Masukkan ID Obat"
                  />
                </div>

                <div className="form-group text-start">
                  <label htmlFor="stock">
                    Stok Obat<span>*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Masukkan Stok Obat"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate("/obat")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahObat;