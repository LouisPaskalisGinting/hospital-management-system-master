import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/static/CutiView.css";

const CutiView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCuti } = location.state || {};

  if (!selectedCuti) {
    return <p>Data cuti tidak tersedia.</p>;
  }

  return (
    <div className="cuti-view-container">
      <h2>Cuti Karyawan</h2>
      <div className="cuti-details">
        <div className="cuti-detail-item">
          <label>ID Karyawan</label>
          <input type="text" value={selectedCuti.userId} readOnly />
        </div>
        <div className="cuti-detail-item">
          <label>Nama Karyawan</label>
          <input type="text" value={selectedCuti.username} readOnly />
        </div>
        <div className="cuti-detail-item">
          <label>Jabatan</label>
          <input type="text" value={selectedCuti.role} readOnly />
        </div>
        <div className="cuti-detail-item">
          <label>Kategori Cuti</label>
          <input type="text" value={selectedCuti.category} readOnly />
        </div>
        <div className="cuti-detail-item">
          <label>Keterangan Mengajukan Cuti</label>
          <input type="text" value={selectedCuti.description} readOnly />
        </div>
        <div className="cuti-detail-item">
          <label>Bukti Dokumen Cuti</label>
          <button
            className="btn btn-primary"
            onClick={() => window.open(`${selectedCuti.documentUrl}`, "_blank")}
          >
            Lihat Lampiran
          </button>
        </div>
        <div className="cuti-detail-item">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CutiView;