import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { jwtDecode } from 'jwt-decode'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Función para obtener user_id desde el token
const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decoded: any = jwtDecode(token)
    const userId = parseInt(decoded.sub) // "sub" es el campo con el user_id
    return isNaN(userId) ? null : userId
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}

const GraficHistogram = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = getUserIdFromToken()
    if (!userId) {
      console.error('No se pudo obtener el user_id del token.')
      setLoading(false)
      return
    }

    fetch(`https://pybot.aleosh.online/api1/graphics/histogram?user_id=${userId}&days=7`)
      .then(res => res.json())
      .then(json => {
        const rawData: number[] = json.data.attributes.speed_data

        if (rawData.length === 0) {
          setChartData(null)
          setLoading(false)
          return
        }

        const binSize = 5
        const max = Math.max(...rawData)
        const bins = Array.from({ length: Math.ceil((max + 1) / binSize) }, (_, i) => i * binSize)

        const frequencies = bins.map(start => {
          const end = start + binSize
          return rawData.filter(value => value >= start && value < end).length
        })

        const data = {
          labels: bins.map(start => `${start}-${start + binSize - 1}`),
          datasets: [
            {
              label: 'Frecuencia',
              data: frequencies,
              backgroundColor: '#4A90E2',
            },
          ],
        }

        setChartData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error al cargar histograma:', err)
        setChartData(null)
        setLoading(false)
      })
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Histograma de Velocidades',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervalos de velocidad',
        },
      },
    },
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Histograma</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default GraficHistogram
