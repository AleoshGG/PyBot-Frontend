import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const dayMap: Record<string, string> = {
  Mon: 'Lunes',
  Tue: 'Martes',
  Wed: 'Miércoles',
  Thu: 'Jueves',
  Fri: 'Viernes',
  Sat: 'Sábado',
  Sun: 'Domingo',
}

const allDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const BarChart = () => {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    // Decodifica token para obtener userId
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
    if (!userId) return

    fetch(`https://pybot.aleosh.online/api1/graphics/barras/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error en la solicitud')
        return res.json()
      })
      .then((data) => {
        const apiData = data.data.attributes.data

        // Inicializar horas por día (español)
        const hoursByDay: Record<string, number> = {}
        allDays.forEach((day) => {
          hoursByDay[day] = 0
        })

        // Sumar horas usando el mapeo de días
        apiData.forEach((item: any) => {
          const dayEng = item.day_work
          const dayEsp = dayMap[dayEng]
          if (dayEsp && hoursByDay[dayEsp] !== undefined) {
            const start = new Date(item.start_hour)
            const end = new Date(item.end_hour)
            const hoursWorked = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
            hoursByDay[dayEsp] += hoursWorked
          }
        })

        const orderedLabels = allDays
        const orderedHours = allDays.map((day) => hoursByDay[day])

        setChartData({
          labels: orderedLabels,
          datasets: [
            {
              label: 'Horas Trabajadas',
              data: orderedHours,
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
              borderRadius: 5,
            },
          ],
        })
      })
      .catch((err) => {
        console.error('Error al obtener los datos:', err)
      })
  }, [])

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Horas Trabajadas por Día</h2>
      {chartData && (
        <div className="h-[370px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Horas Trabajadas',
                  },
                  beginAtZero: true,
                },
                y: {
                  title: {
                    display: true,
                    text: 'Días de la Semana',
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

export default BarChart
