import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { serviceLogin } from "../../services/login/serviceLogin";
import { serviceAccount } from "../../services/acount/serviceAccount";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Estados Sign Up
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleSignUp = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W])[A-Za-z\d\W]{8}$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "El correo debe contener @ y un dominio válido.",
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "Debe tener 8 caracteres, una mayúscula, una minúscula y un carácter alfanumérico.",
      });
      return;
    }

    const userData = { first_name, last_name, email, password };

    serviceAccount(
      userData,
      () => {
        Swal.fire({
          icon: "success",
          title: "¡Usuario registrado!",
          timer: 1500,
          showConfirmButton: false,
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    );
  };

  const handleSignIn = () => {
    if (!emailRegex.test(loginEmail)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "Debe contener @ y un dominio válido.",
      });
      return;
    }

    const credentials = {
      email: loginEmail,
      password: loginPassword,
    };

    serviceLogin(
      credentials,
      () => {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/init"));
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: error,
        });
      }
    );
  };

  return (
    <div className="w-full h-screen bg-[#fafaf5] flex items-center justify-center">
      {/* ---------- CONTENEDOR PRINCIPAL ---------- */}
      <div className="relative w-full max-w-5xl h-[650px] md:h-[550px] bg-white shadow-xl overflow-hidden rounded-lg">

        {/* ---------- MOBILE VIEW (visible SOLO en < md) ---------- */}
        <div className="flex flex-col w-full h-full md:hidden p-6 overflow-y-auto">

          {!isSignUp && (
            <div className="flex flex-col items-center mt-10">
              <h1 className="text-3xl font-bold text-teal-600 mb-6">Acceso</h1>

              <div className="flex space-x-4 text-xl text-gray-700 mb-6">
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
              </div>

              <div className="w-full max-w-xs mb-3 relative">
                <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Correo"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md outline-none"
                />
              </div>

              <div className="w-full max-w-xs mb-3 relative">
                <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md outline-none"
                />
              </div>

              <button
                onClick={handleSignIn}
                className="mt-4 w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md"
              >
                Ingresar
              </button>

              <button
                onClick={() => setIsSignUp(true)}
                className="mt-3 text-teal-600 underline"
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          )}

          {isSignUp && (
            <div className="flex flex-col items-center mt-10">
              <h1 className="text-3xl font-bold text-teal-600 mb-6">Crear Cuenta</h1>

              <div className="flex space-x-4 text-xl text-gray-700 mb-6">
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
              </div>

              <div className="w-full max-w-xs mb-3 relative">
                <HiOutlineUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nombre"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Apellido"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full max-w-xs mb-3 px-4 py-3 bg-gray-100 rounded-md outline-none"
              />

              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-xs mb-3 px-4 py-3 bg-gray-100 rounded-md outline-none"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-xs mb-3 px-4 py-3 bg-gray-100 rounded-md outline-none"
              />

              <button
                onClick={handleSignUp}
                className="mt-4 w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md"
              >
                Registrarse
              </button>

              <button
                onClick={() => setIsSignUp(false)}
                className="mt-3 text-teal-600 underline"
              >
                Ya tengo cuenta
              </button>
            </div>
          )}
        </div>

        {/* ---------- DESKTOP VIEW (>= md) ---------- */}
        <div
          className={`hidden md:flex absolute top-0 left-0 w-[200%] h-full transition-transform duration-700 ease-in-out ${
            isSignUp ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* SIGN IN */}
          <div className="w-1/2 flex items-center justify-center bg-white">
            <div className="max-w-md w-full px-8 -ml-122">
              <h1 className="text-3xl font-bold text-teal-600 mb-6">Acceso</h1>
              <div className="flex space-x-4 text-xl text-gray-700 mb-6 justify-center">
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
              </div>

              <div className="space-y-4 mb-4">
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Correo"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                  />
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSignIn}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
              >
                Ingresar
              </button>
            </div>
          </div>

          {/* SIGN UP */}
          <div className="w-1/2 flex items-center justify-center bg-white">
            <div className="max-w-md w-full px-12 ml-122">
              <h1 className="text-3xl font-bold text-teal-600 mb-6">Crear una cuenta</h1>

              <div className="flex space-x-4 text-xl text-gray-700 mb-6 justify-center">
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
              </div>

              <div className="space-y-4 mb-4">
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Apellido"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none"
                />

                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none"
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none"
                />
              </div>

              <button
                onClick={handleSignUp}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
              >
                Inscribirse
              </button>
            </div>
          </div>
        </div>

        {/* ---------- DESKTOP OVERLAY ---------- */}
        <div
          className={`hidden md:flex absolute top-0 h-full w-1/2 bg-gradient-to-br from-teal-500 to-teal-600 text-white items-center justify-center px-10 transition-all duration-700 ${
            isSignUp ? "left-0" : "left-1/2"
          }`}
        >
          <div className="text-center">
            {isSignUp ? (
              <>
                <h2 className="text-3xl font-bold mb-4">Bienvenido!</h2>
                <p className="mb-6">Ingresa con tu información personal.</p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-teal-600"
                >
                  Iniciar sesión
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Hola, Amigo!</h2>
                <p className="mb-6">
                  Ingresa tus detalles personales e inicia tu jornada con nosotros.
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-teal-600"
                >
                  Inscribirse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
