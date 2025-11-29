import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title)

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

const WorkPeriodSuccessProbability = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [probability, setProbability] = useState<number | null>(null)

  // MODO OSCURO sincronizado con localStorage
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  )

  // Actualización automática cuando el menú cambia darkMode
  useEffect(() => {
    const handleStorage = () => {
      const mode = localStorage.getItem("darkMode") === "true"
      setDarkMode(mode)
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])


  // ---- FETCH Y GRÁFICA ----------------------------------------------------------
  const fixedWeight = 0.15

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    const decoded = decodeJWT(token)
    const userId = decoded?.sub
    if (!userId) {
      setLoading(false)
      return
    }

    fetch(`https://pybot.aleosh.online/api1/graphics/ojiva`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        const dataPoints = json.data.attributes.cumulative_weights
        if (!dataPoints || dataPoints.length === 0) {
          setChartData(null)
          setLoading(false)
          return
        }

        dataPoints.sort((a: any, b: any) => a.avg_weight - b.avg_weight)

        const total = dataPoints.length
        let cumulativeCount = 0
        const weights: number[] = []
        const probabilities: number[] = []

        for (const p of dataPoints) {
          weights.push(p.avg_weight / 1000)
        }

        for (let i = 0; i < dataPoints.length; i++) {
          cumulativeCount += 1
          probabilities.push(cumulativeCount / total)
        }

        setChartData({
          labels: weights.map(w => w.toFixed(3) + ' kg'),
          datasets: [
            {
              label: 'Probabilidad acumulada de éxito (peso promedio)',
              data: probabilities,
              borderColor: darkMode ? '#60a5fa' : '#6366f1',
              backgroundColor: darkMode ? '#93c5fd' : '#a5b4fc',
              fill: false,
              tension: 0.3,
            },
          ],
        })

        let prob = 0
        for (let i = 0; i < weights.length; i++) {
          if (weights[i] <= fixedWeight) prob = probabilities[i]
          else break
        }

        setProbability(prob)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al cargar probabilidad:', error)
        setChartData(null)
        setLoading(false)
      })
  }, [darkMode])


  // ---- UI -----------------------------------------------------------------------
  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-xl shadow-md mt-8 h-120 transition-colors duration-300
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
      `}
    >
      <p className="mt-6 text-center text-lg font-medium">
        La probabilidad acumulada de tener un período de trabajo exitoso con peso promedio menor o igual a{' '}
        <strong>150 gramos</strong> es:{' '}
        <strong>{probability !== null ? (probability * 100).toFixed(2) : '0'}%</strong>
      </p>

      {loading && (
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Cargando datos...
        </p>
      )}

      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: { color: darkMode ? '#fff' : '#000' },
              },
              tooltip: {
                titleColor: darkMode ? '#fff' : '#000',
                bodyColor: darkMode ? '#fff' : '#000',
                backgroundColor: darkMode ? '#333' : '#fff',
              },
              title: {
                display: true,
                text: 'Función de Probabilidad Acumulada de Peso Promedio',
                color: darkMode ? '#fff' : '#000',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 1,
                ticks: { color: darkMode ? '#fff' : '#000' },
                grid: {
                  color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                },
                title: {
                  display: true,
                  text: 'Probabilidad acumulada',
                  color: darkMode ? '#fff' : '#000',
                },
              },
              x: {
                ticks: { color: darkMode ? '#fff' : '#000' },
                grid: {
                  color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                },
                title: {
                  display: true,
                  text: 'Peso Promedio (kg)',
                  color: darkMode ? '#fff' : '#000',
                },
              },
            },
          }}
        />
      )}

      {!loading && !chartData && (
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No hay datos disponibles para mostrar.
        </p>
      )}
    </div>
  )
}

export default WorkPeriodSuccessProbability
