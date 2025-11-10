import React, { useEffect, useState } from "react";
import { cameraService } from "../services/CameraService";
import type { CamData } from "../../domain/entities/CamMessageData";
import fallbackImg from "../../assets/error-message.png"; 
import Menu from "../../components/menu/menu";

const CameraView: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // Removed unused detections state
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    cameraService.execute(localStorage.getItem("selectedPrototypeId") || "", (data: CamData) => {
      const base64Image = data.image.startsWith("data:image")
        ? data.image
        : `data:image/jpeg;base64,${data.image}`;

      setImageSrc(base64Image);
      // Removed setDetections as detections state is not used
    });

    return () => {
      cameraService.stop();
    };
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Menu sin bordes, sin sombra */}
      <div className="w-64 bg-white">
        <Menu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Contenido sin sombra ni borde, solo padding */}
      <div className="flex-1 p-10 flex flex-col overflow-auto">
        <h2 className="text-4xl font-bold mb-1">Visualización de mi robot</h2>
        <p className="text-2xl text-gray-600 mb-4">
          En este momento usted puede ver su robot en tiempo real mediante la cámara
        </p>

        <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-gray-200">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="streaming"
              className="w-full h-full object-cover border-2 border-black rounded-xl"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <img
                src={fallbackImg}
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

export default CameraView;
