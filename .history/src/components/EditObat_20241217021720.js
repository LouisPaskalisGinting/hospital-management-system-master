import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/EditObat.css"; // Import file CSS
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
import { ObatRepository } from "../data/repository/ObatRepository";

const EditObat = () => {
  const obatRepository = new ObatRepository();
  const location = useLocation();
  const navigate = useNavigate();
  const obat = location.state?.obat || {};
  const updateObat = location.state?.updateObat || (() => {}); // Fungsi updateObat

  const [formData, setFormData] = useState({
    id: obat.id || "",
    createdAt: obat.createdAt || "",
    name: obat.name || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await obatRepository.setObat({
        ...formData,
        stock: obat.stock,
      }); // Memanggil fungsi setObat
      updateObat(formData); // Memanggil fungsi updateObat
      navigate("/obat"); // Kembali ke halaman daftar obat
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/obat"); // Kembali ke halaman daftar obat
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Data Obat
          </h2>
          <h2 className="text-start px-10 text-2xl font-bold">
            Edit Data Obat
          </h2>
          <div className="mx-10 bg-white p-4 rounded-lg">
            <div className="gap-2 text-start">
              <div className="form-edit-obat">
                <div className="form-group">
                  <label>ID Obat</label>
                  <input type="text" name="id" value={formData.id} readOnly />
                </div>
                <div className="form-group">
                  <label>
                    Tanggal Masuk <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Nama Obat <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-group">
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSave}>
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

export default EditObat;