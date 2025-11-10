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
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

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
  const fixedWeight = 0.15 // 150 gramos en kg

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

    fetch(`https://pybot.aleosh.online/api1/graphics/probabilidad/${userId}`, {
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

        // Ordenar por peso promedio
        dataPoints.sort((a: any, b: any) => a.avg_weight - b.avg_weight)

        const total = dataPoints.length
        let cumulativeCount = 0
        const weights: number[] = []
        const probabilities: number[] = []

        // Convertir gramos a kilogramos y llenar pesos
        for (const p of dataPoints) {
          weights.push(p.avg_weight / 1000)
        }

        // Calcular probabilidades acumuladas
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
              borderColor: '#6366f1',
              backgroundColor: '#a5b4fc',
              fill: false,
              tension: 0.3,
            },
          ],
        })

        // Calcular probabilidad acumulada para peso ≤ fixedWeight (0.15 kg)
        let prob = 0
        for (let i = 0; i < weights.length; i++) {
          if (weights[i] <= fixedWeight) {
            prob = probabilities[i]
          } else {
            break
          }
        }
        setProbability(prob)

        setLoading(false)
      })
      .catch(error => {
        console.error('Error al cargar probabilidad:', error)
        setChartData(null)
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8 h-120">
      <p className="mt-6 text-center text-lg font-medium">
        La probabilidad acumulada de tener un período de trabajo exitoso con peso promedio menor o igual a <strong>150 gramos</strong> es:{' '}
        <strong>{(probability !== null ? (probability * 100).toFixed(2) : '0')}%</strong>
      </p>

      {loading && <p className="text-center text-gray-500">Cargando datos...</p>}

      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'bottom' },
              title: {
                display: true,
                text: 'Función de Probabilidad Acumulada de Peso Promedio',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 1,
                title: {
                  display: true,
                  text: 'Probabilidad acumulada',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Peso Promedio (kg)',
                },
              },
            },
          }}
        />
      )}

      {!loading && !chartData && (
        <p className="text-center text-gray-500">No hay datos disponibles para mostrar.</p>
      )}
    </div>
  )
}

export default WorkPeriodSuccessProbability
