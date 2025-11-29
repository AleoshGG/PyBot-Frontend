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

  // 🌙 MODO OSCURO desde localStorage
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  )

  // 🔄 Se actualiza cuando tu menú cambia el modo y dispara storage
  useEffect(() => {
    const handleStorage = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true")
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // 🔥 FETCH DE LOS DATOS Y RENDER DE GRÁFICA
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

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

        const hoursByDay: Record<string, number> = {}
        allDays.forEach((day) => (hoursByDay[day] = 0))

        apiData.forEach((item: any) => {
          const dayEng = item.day_work
          const dayEsp = dayMap[dayEng]
          if (dayEsp) {
            const start = new Date(item.start_hour)
            const end = new Date(item.end_hour)
            const hoursWorked = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
            hoursByDay[dayEsp] += hoursWorked
          }
        })

        const orderedHours = allDays.map((day) => hoursByDay[day])

        setChartData({
          labels: allDays,
          datasets: [
            {
              label: 'Horas Trabajadas',
              data: orderedHours,
              backgroundColor: darkMode
                ? 'rgba(96, 165, 250, 0.7)' // azul claro en modo oscuro
                : 'rgba(59, 130, 246, 0.7)', // azul normal
              borderRadius: 5,
            },
          ],
        })
      })
      .catch((err) => console.error('Error al obtener los datos:', err))
  }, [darkMode])

  return (
    <div
      className={`
        p-4 rounded-xl shadow-md w-full max-w-5xl mx-auto transition-colors duration-300
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
      `}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Horas Trabajadas por Día</h2>

      {chartData && (
        <div className="h-[370px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: {
                legend: {
                  labels: {
                    color: darkMode ? 'white' : 'black',
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Horas Trabajadas',
                    color: darkMode ? 'white' : 'black',
                  },
                  ticks: {
                    color: darkMode ? 'white' : 'black',
                  },
                  beginAtZero: true,
                },
                y: {
                  title: {
                    display: true,
                    text: 'Días de la Semana',
                    color: darkMode ? 'white' : 'black',
                  },
                  ticks: {
                    color: darkMode ? 'white' : 'black',
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
