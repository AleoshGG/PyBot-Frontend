import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Card from '../../components/cards/card.tsx'
import { getAllPrototypes, createPrototype } from '../../services/prototype/prototype.tsx'
import type { Prototype } from '../../services/prototype/prototype.tsx'

const MySwal = withReactContent(Swal)

export default function Init() {
  const [cards, setCards] = useState<Prototype[]>([])
  const [loading, setLoading] = useState(true)

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode))
  }, [darkMode])


  useEffect(() => {
    async function fetchPrototypes() {
      try {
        const allPrototypes = await getAllPrototypes()
        console.log('Respuesta API prototipos:', allPrototypes)

        const prototypesArray = Array.isArray(allPrototypes?.data?.prototypes)
          ? allPrototypes.data.prototypes
          : []

        if (!Array.isArray(prototypesArray)) {
          console.warn('No es un arreglo válido de prototipos')
          setCards([])
          return
        }

        console.log('Lista completa de prototipos:', prototypesArray)

        setCards(prototypesArray)
      } catch (error) {
        console.error('Error al cargar prototipos:', error)
        setCards([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrototypes()
  }, [])

  const handleAddCard = async () => {
    const { value: formValues } = await MySwal.fire({
      title: 'Agregar dispositivo',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="ID del dispositivo">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nombre del dispositivo">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const prototype_id = (document.getElementById('swal-input1') as HTMLInputElement).value.trim()
        const prototype_name = (document.getElementById('swal-input2') as HTMLInputElement).value.trim()
        if (!prototype_id || !prototype_name) {
          Swal.showValidationMessage('Ambos campos son obligatorios')
          return
        }
        return { prototype_id, prototype_name }
      }
    })

    if (formValues) {
      try {
        const newPrototype = await createPrototype(formValues)

        setCards((prev) => [...prev, newPrototype])

        Swal.fire({
          icon: 'success',
          title: 'Dispositivo agregado',
          text: `Dispositivo "${newPrototype.prototype_name}" agregado con ID ${newPrototype.prototype_id}`
        })
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Error desconocido al agregar dispositivo'
        })
      }
    }
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/' // redirige a página de login o inicio
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-teal-600 text-xl">Cargando prototipos...</p>
      </div>
    )
  }

  return (
    <div className={`flex min-h-screen relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#fefdf6] text-black'}`}>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-teal-600 mb-8">Welcome to PyBot</h1>

        {cards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cards.map(({ prototype_id, prototype_name }) => (
              <Card key={prototype_id} id={prototype_id} name={prototype_name} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay prototipos para mostrar.</p>
        )}
      </div>

      {/* Contenedor fijo para los botones */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

        {/* Botón para agregar dispositivo */}
        <button
          onClick={handleAddCard}
          className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600"
          title="Agregar nuevo dispositivo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Botón modo oscuro */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
          title="Activar/Desactivar modo oscuro"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-10.66l-.7.7m-13.59 0l-.7-.7M21 12h-1M4 12H3m16.66 6.66l-.7-.7m-13.59 0l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Botón salir */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700"
          title="Salir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8v8" />
          </svg>
        </button>
      </div>
    </div>
  )
}
