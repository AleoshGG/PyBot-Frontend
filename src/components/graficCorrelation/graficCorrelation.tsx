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
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Error fetching correlacion:', error)
      })
  }, [])

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-200">
      <h2 className="text-xl font-bold mb-4 text-center">Correlación Distancia vs Peso de Desperdicio</h2>
      {chartData ? (
        <Scatter data={chartData} />
      ) : (
        <p className="text-center text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default CorrelationChart
