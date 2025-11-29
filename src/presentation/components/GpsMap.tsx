import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { gpsService } from "../services/GPSService";
import robotIconUrl from "../../assets/robot-logo.png";
import type { GPSData } from "../../domain/entities/GPSData";
import errorVideo from "../../assets/error-message1.png";
import Menu from "../../components/menu/menu";

// ICONO MAPA
const robotIcon = new L.Icon({
  iconUrl: robotIconUrl,
  iconSize: [55, 55],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const GpsMap: React.FC = () => {

  // Dark mode persistente REAL
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [data, setData] = useState<GPSData | null>(null);

  useEffect(() => {
    gpsService.execute(localStorage.getItem("selectedPrototypeId") || "", setData);
    return () => gpsService.stop();
  }, []);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* MENU */}
      <div className={`${darkMode ? "bg-gray-900" : "bg-white"} w-64`}>
        <Menu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-10 flex flex-col overflow-auto">
        <h2 className="text-4xl font-bold mb-1">Localizar mi robot</h2>
        <p className={`text-2xl mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          En este momento usted puede ver su robot en tiempo real mediante un mapa
        </p>

        <div
          className={`relative w-full flex-1 rounded-xl overflow-hidden 
            ${darkMode ? "bg-gray-700" : "bg-gray-200"} 
            h-64 sm:h-80 md:h-96 lg:h-[500px]`}
        >
          {data ? (
            <MapContainer
              center={[data.lat, data.lon]}
              zoom={18}
              className="w-full h-full"
            >
              {/* ← Tile dinámico según darkMode */}
              <TileLayer
                url={
                  darkMode
                    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
              />

              <Marker position={[data.lat, data.lon]} icon={robotIcon}>
                <Popup>
                  <strong>Ubicación PyBot</strong>
                  <br />
                  Lat: {data.lat.toFixed(6)}
                  <br />
                  Lon: {data.lon.toFixed(6)}
                  <br />
                  Alt: {data.alt} m
                  <br />
                  Vel: {data.spd} km/h
                  <br />
                  Sats: {data.sats}
                  <br />
                  Fecha: {data.date} {data.UTC}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={errorVideo}
                alt="No se pudo cargar la visualización del robot"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GpsMap;
