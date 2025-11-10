import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const GraficOgive = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    // Decodificar token para obtener userId
    const decodeJWT = (token: string) => {
      try {
        const payload = token.split('.')[1]
        const decoded = atob(payload)
        return JSON.parse(decoded)
      } catch {
        return null
      }
    }

    const decoded = decodeJWT(token)
    const userId = decoded?.sub
    if (!userId) {
      setLoading(false)
      return
    }

    fetch(`https://pybot.aleosh.online/api1/graphics/probabilidad/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        const weights: number[] = json.data.attributes.cumulative_weights.map(
          (item: any) => item.avg_weight
        )
        if (weights.length === 0) {
          setChartData(null)
          setLoading(false)
          return
        }

        // Definir tamaño del intervalo (bin)
        const binSize = 500
        const maxWeight = Math.max(...weights)
        const binsCount = Math.ceil(maxWeight / binSize)

        // Crear intervalos y calcular frecuencias
        const bins = Array.from({ length: binsCount }, (_, i) => ({
          start: i * binSize,
          end: (i + 1) * binSize,
          frequency: 0,
        }))

        weights.forEach(weight => {
          const binIndex = Math.min(
            Math.floor(weight / binSize),
            binsCount - 1
          )
          bins[binIndex].frequency += 1
        })

        // Calcular frecuencia acumulada
        let cumulative = 0
        const cumulativeFrequencies = bins.map(bin => {
          cumulative += bin.frequency
          return cumulative
        })

        // Etiquetas para X (intervalos)
        const labels = bins.map(bin => `${bin.start}-${bin.end - 1}`)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Frecuencia Acumulada',
              data: cumulativeFrequencies,
              borderColor: '#6366f1',
              backgroundColor: '#a5b4fc',
              fill: false,
              tension: 0.3,
            },
          ],
        })
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al cargar ojiva:', error)
        setChartData(null)
        setLoading(false)
      })
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Gráfica de Ojiva - Frecuencia Acumulada',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia acumulada',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervalos de peso',
        },
      },
    },
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Gráfica de Ojiva</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">No hay datos disponibles para mostrar.</p>
      )}
    </div>
  )
}

export default GraficOgive
