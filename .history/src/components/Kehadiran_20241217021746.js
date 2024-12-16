// Kehadiran.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
  faSearch,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/static/Karyawan.css";
import { AbsenRepository } from "../data/repository/AbsenRepository";
import { formatDate, formatTime } from "../util/DateFormatter";
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const Kehadiran = () => {
  const absenRepository = new AbsenRepository();
  const [selectedDate, setSelectedDate] = useState(null);
  const [search, setSearch] = useState("");

  const [attendanceData, setAttendanceData] = useState([]);
  const [location, setLocation] = useState(null);

  const fetchAbsen = async (search = "", date = null) => {
    if (date) {
      await absenRepository.fetchAbsen(date).then((data) => {
        if (search === "") {
          setAttendanceData(data);
        } else {
          const filteredData = data.filter((item) => {
            return item.username.toLowerCase().includes(search.toLowerCase());
          });
          setAttendanceData(filteredData);
        }
      });
    }
  };

  const initSelectedDate = async () => {
    const date = formatDate(new Date());
    setSelectedDate(date);
  };

  useEffect(() => {
    initSelectedDate();
    fetchAbsen();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAbsen(search, selectedDate);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search, selectedDate]);

  const [selectedAbsen, setSelectedAbsen] = useState(null);

  const handleOpenMap = (employee) => {
    setSelectedAbsen(employee);
  };

  const handleCloseMap = () => {
    setSelectedAbsen(null);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const customIcon = icon({
    iconUrl: "/marker.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="w-full">
        <div className="flex bg-white w-full p-4 justify-start">
          <span className="text-2xl font-bold text-start">
            Kehadiran Karyawan
          </span>
        </div>

        <div className="attendance-container">
          <div className="flex flex-row gap-4">
            <div>
              <input
                type="text"
                placeholder="Search.."
                className="bg-gray-50"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Waktu Presensi</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>ID Karyawan</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data, index) => (
                <tr key={index}>
                  <td>{formatTime(data.date.toDate())}</td>
                  <td>{data.dateString}</td>
                  <td>{data.username}</td>
                  <td>{data.userId}</td>
                  <td>{data.role}</td>
                  <td>
                    <span className="status hadir">{data.type}</span>
                  </td>
                  <td>
                    <button
                      className="lihat-kehadiran-button"
                      onClick={() => handleOpenMap(data)}
                    >
                      Lihat Kehadiran
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedAbsen && (
          <div className="modal-overlay" onClick={handleCloseMap}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Lokasi Presensi {selectedAbsen.nama}</h3>
              <MapContainer
                style={{ height: "400px", width: "400px" }}
                center={[
                  selectedAbsen.location.latitude,
                  selectedAbsen.location.longitude,
                ]}
                zoom={25}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    selectedAbsen.location.latitude,
                    selectedAbsen.location.longitude,
                  ]}
                  icon={customIcon}
                >
                  <Popup>Klinik Utama Kasih Ibu</Popup>
                </Marker>
              </MapContainer>
              <button className="close-button" onClick={handleCloseMap}>
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kehadiran;