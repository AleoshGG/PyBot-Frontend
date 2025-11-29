import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignIn from './pages/singIn/SingIn'
import Profile from './pages/profile/Profile'
import PageGrafic from './pages/grafic/PageGrafic'
import Init from './pages/Init/Init'
import CameraView from './presentation/components/CameraView'
import GpsMap from './presentation/components/GpsMap'

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singin" element={<SignIn />} />

      {/* Protegidas */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/grafic"
        element={
          <ProtectedRoute>
            <PageGrafic />
          </ProtectedRoute>
        }
      />
      <Route
        path="/init"
        element={
          <ProtectedRoute>
            <Init />
          </ProtectedRoute>
        }
      />
      <Route
        path="/camera-view"
        element={
          <ProtectedRoute>
            <CameraView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/map-view"
        element={
          <ProtectedRoute>
            <GpsMap />
          </ProtectedRoute>   
        }
      />
    </Routes>
  )
}

export default App
