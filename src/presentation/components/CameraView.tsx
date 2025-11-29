import React, { useEffect, useState } from "react";
import { cameraService } from "../services/CameraService";
import type { CamData } from "../../domain/entities/CamMessageData";
import fallbackImg from "../../assets/error-message1.png";
import Menu from "../../components/menu/menu";

const CameraView: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    cameraService.execute(localStorage.getItem("selectedPrototypeId") || "", (data: CamData) => {
      const base64Image = data.image.startsWith("data:image")
        ? data.image
        : `data:image/jpeg;base64,${data.image}`;

      setImageSrc(base64Image);
    });

    return () => {
      cameraService.stop();
    };
  }, []);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Menú */}
      <div className={`${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <Menu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 flex flex-col overflow-auto">
        <h2 className="text-4xl font-bold mb-1">Visualización de mi robot</h2>
        <p className="text-2xl mb-4">
          En este momento usted puede ver su robot en tiempo real mediante la cámara
        </p>

        <div
          className={`relative w-full flex-1 rounded-xl overflow-hidden ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="streaming"
              className="w-full h-full object-cover border-2 border-black rounded-xl"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={fallbackImg}
                alt="Error de cámara"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraView;
