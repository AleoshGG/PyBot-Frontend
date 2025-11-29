import { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(PointElement, LinearScale, Tooltip, Legend)

const decodeJWT = (token: string) => {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

const CorrelationChart = () => {
  const [chartData, setChartData] = useState<any>(null)

  // MODO OSCURO sincronizado con localStorage
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const decoded = decodeJWT(token)
    const userId = decoded?.sub
    if (!userId) return

    fetch(`https://pybot.aleosh.online/api1/graphics/correlacion/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error en la solicitud')
        return res.json()
      })
      .then((data) => {
        const rawPoints = data?.data?.attributes?.points
        if (!rawPoints || !Array.isArray(rawPoints)) {
          console.error('Datos inválidos: points no existe o no es array')
          setChartData(null)
          return
        }

        const points = rawPoints.map((item: any) => ({
          x: item.distance_traveled,
          y: item.weight_waste,
        }))

        setChartData({
          datasets: [
            {
              label: 'Distancia recorrida vs Peso de desecho',
              data: points,
              backgroundColor: darkMode
                ? 'rgba(34,197,94,0.8)'          // verde claro para modo oscuro
                : 'rgba(16,185,129,0.7)',       // verde original
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Error fetching correlacion:', error)
      })
  }, [darkMode])

  return (
    <div
      className={`
        p-4 rounded-xl shadow-md w-200 transition-all duration-300
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      `}
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Correlación Distancia vs Peso de Desperdicio
      </h2>

      {chartData ? (
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: darkMode ? '#fff' : '#000',
                },
              },
              tooltip: {
                titleColor: darkMode ? '#fff' : '#000',
                bodyColor: darkMode ? '#fff' : '#000',
                backgroundColor: darkMode ? '#333' : '#fff',
              },
            },
            scales: {
              x: {
                ticks: { color: darkMode ? '#fff' : '#000' },
                title: {
                  display: true,
                  text: 'Distancia Recorrida',
                  color: darkMode ? '#fff' : '#000',
                },
              },
              y: {
                ticks: { color: darkMode ? '#fff' : '#000' },
                title: {
                  display: true,
                  text: 'Peso del Desecho',
                  color: darkMode ? '#fff' : '#000',
                },
              },
            },
          }}
        />
      ) : (
        <p className="text-center text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default CorrelationChart
