import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faClipboardCheck,
  faPills,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../assets/static/SetLokasi.css";
import Sidebar from "./Sidebar";
import { LocationRepository } from "../data/repository/LocationRepository";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const SetLokasi = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const locationRepository = new LocationRepository();

  const fetchLocation = async () => {
    const data = await locationRepository.fetchLocation();
    setLocation(data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const customIcon = icon({
    iconUrl: "/marker.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  const LocationFinder = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({
          latitude: lat,
          longitude: lng,
          radius: location.radius,
        });
      },
    });
    return null;
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleSaveClick = () => {
    try {
      locationRepository.setLocation(location);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="set-lokasi-layout">
      <Sidebar />

      <main className="w-full">
        <header className="flex flex-row mb-8 bg-white justify-between items-center">
          <h2 className="p-4 text-2xl font-bold">Setting Lokasi Presensi</h2>
          <div className="user-info px-4">
            <span>Admin</span>
            <div className="user-icon">A</div>
          </div>
        </header>

        {location && (
          <section className="location-settings">
            <div className="location-card">
              <label>Lokasi Kantor</label>
              <input
                type="text"
                value={`${location.latitude}, ${location.longitude}`}
                readOnly
              />
              <label>Radius</label>
              <input
                type="text"
                value={location.radius}
                onChange={(e) =>
                  setLocation({ ...location, radius: e.target.value })
                }
              />
              <MapContainer
                style={{ height: "300px", width: "450px" }}
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
                />
                <LocationFinder />
              </MapContainer>
              <div className="action-buttons">
                <button onClick={handleBackClick} className="back-button">
                  Back
                </button>
                <button onClick={handleSaveClick} className="setting-button">
                  Save
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SetLokasi;