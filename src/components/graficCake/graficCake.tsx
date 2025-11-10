// src/components/GraficCake.tsx
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { getUserIdFromToken } from '../auth/authUtils'

ChartJS.register(ArcElement, Tooltip, Legend)

// Se ajustan las propiedades al JSON real
interface DistributionItem {
  waste_type: string
  total_amount: number
}

const GraficCake = () => {
  
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = getUserIdFromToken()
    if (!userId) {
      console.error('No se pudo obtener el user_id del token.')
      setLoading(false)
      return
    }

    fetch(`https://pybot.aleosh.online/api1/graphics/pastel?user_id=${userId}`)
      .then(res => res.json())
      .then(json => {
        const distribution: DistributionItem[] = json.data.attributes.distribution

        if (distribution.length > 0) {
          const labels = distribution.map(item => item.waste_type)
          const data = distribution.map(item => item.total_amount)

          setChartData({
            labels,
            datasets: [
              {
                label: 'Distribución de residuos',
                data,
                backgroundColor: [
                  '#f87171', // rojo
                  '#60a5fa', // azul
                  '#34d399', // verde
                  '#fbbf24', // amarillo
                  '#a78bfa', // morado
                  '#f472b6'  // rosa
                ],
                borderWidth: 1
              }
            ]
          })
        } else {
          setChartData(null)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error)
        setChartData(null)
        setLoading(false)
      })
  }, [])

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Gráfica de Residuos (30 días)</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : chartData ? (
        <Pie data={chartData} />
      ) : (
        <p className="text-center text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default GraficCake
