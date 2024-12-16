import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../assets/static/Dashboard.css";
import Sidebar from "./Sidebar";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LocationRepository } from "../data/repository/LocationRepository";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { UserRepository } from "../data/repository/UserRepository";
import { ObatRepository } from "../data/repository/ObatRepository";
import { PayrollRepository } from "../data/repository/PayrollRepository";

const Dashboard = () => {
  const locationRepository = new LocationRepository();
  const userRepository = new UserRepository();
  const payrollRepository = new PayrollRepository();
  const obatRepository = new ObatRepository();

  const [location, setLocation] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [obatCount, setObatCount] = useState(0);
  const [payrollCount, setPayrollCount] = useState(0);
  const [jabatanCount, setJabatanCount] = useState(0);

  const navigate = useNavigate();

  const detailKaryawan = () => {
    navigate("/karyawan");
  };
  const detailObat = () => {
    navigate("/obat");
  };
  const detailJabatan = () => {
    navigate("/karyawan");
  };
  const detailPayroll = () => {
    navigate("/payroll");
  };

  const handleSetLocation = () => {
    navigate("/setlokasi"); // Menambahkan navigasi ke halaman SetLokasi
  };

  const fetchLocation = async () => {
    const data = await locationRepository.fetchLocation();
    setLocation(data);
  };

  const fetchUserCount = async () => {
    try {
      const count = await userRepository.getUserCount();
      setUserCount(count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };
  
  useEffect(() => {
    fetchUserCount();
  }, [userRepository]);

  const fetchObatCount = async () => {
    try {
      const count = await obatRepository.ObatCount();
      setObatCount(count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };
  
  useEffect(() => {
    fetchObatCount();
  }, [obatRepository]);

  useEffect(() => {
    const fetchPayrollCount = async () => {
      try {
        const count = await payrollRepository.getPayrollCount();
        setPayrollCount(count);
      } catch (error) {
        console.error('Error fetching payroll count:', error);
      }
    };

    fetchPayrollCount();
  }, [payrollRepository]);  

  useEffect(() => { //countRoles
    const fetchRoleCount = async () => {
      try {
        const count = await userRepository.countRoles();
        setJabatanCount(count);
      } catch (error) {
        console.error('Error fetching payroll count:', error);
      }
    };
    fetchRoleCount();
  }, [userRepository]);  


  useEffect(() => {
    fetchLocation();
  }, []);

  const customIcon = icon({
    iconUrl: "/marker.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="w-full">
        <div className="flex bg-white w-full p-4 justify-start">
          <span className="text-2xl font-bold text-start">
            Klinik Utama Kasih Ibu
          </span>
        </div>

        <div className="m-10">
          <section className="info-cards">
            <div className="card blue-card">
              <p>KARYAWAN</p>
              <p>Jumlah: {userCount} Orang</p>
              <button onClick={detailKaryawan}>View Details</button>
            </div>
            <div className="card red-card">
              <p>OBAT</p>
              <p>Jenis Obat: {obatCount} Pcs</p>
              <button onClick={detailObat}>View Details</button>
            </div>
            <div className="card yellow-card">
              <p>JABATAN</p>
              <p>Total Bidang: {jabatanCount} Posisi</p>
              <button onClick={detailJabatan}>View Details</button>
            </div>
            <div className="card green-card">
              <p>INFORMASI PAYROLL</p>
              <p>Klinik Utama Kasih Ibu</p>
              <button onClick={detailPayroll}>View Details</button>
            </div>
          </section>
          {location && (
            <section className="clinic-location">
              <h3>Lokasi Klinik Utama Kasih Ibu</h3>
              <div className="flex flex-row gap-8 w-full justify-start">
                <MapContainer
                  style={{ height: "400px", width: "400px" }}
                  center={[location.latitude, location.longitude]}
                  zoom={25}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[location.latitude, location.longitude]}
                    icon={customIcon}
                  >
                    <Popup>Klinik Utama Kasih Ibu</Popup>
                  </Marker>
                </MapContainer>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between gap-4">
                    <label>Latitude</label>
                    <input
                      type="text"
                      value={`${location.latitude}`}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-4">
                    <label>Longitude</label>
                    <input
                      type="text"
                      value={`${location.longitude}`}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-4">
                    <label>Radius</label>
                    <input type="number" value={location.radius} readOnly />
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSetLocation}
                  >
                    Setting Lokasi
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;