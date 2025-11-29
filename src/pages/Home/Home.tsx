import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import robotImage from '../../assets/robotLandig.png'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/login')
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const mainTextRef = useRef(null)
  const mainTextInView = useInView(mainTextRef, { once: true })

  const mainImageRef = useRef(null)
  const mainImageInView = useInView(mainImageRef, { once: true })

  const servicesRef = useRef(null)
  const servicesInView = useInView(servicesRef, { once: true })

  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true })

  const simpleSolutionsRef = useRef(null)
  const simpleSolutionsInView = useInView(simpleSolutionsRef, { once: true })

  const aboutUsRef = useRef(null)
  const aboutUsInView = useInView(aboutUsRef, { once: true })

  const clientsRef = useRef(null)
  const clientsInView = useInView(clientsRef, { once: true })

  return (
    <div id="home" className="min-h-screen bg-[#f7f7ec] px-6 sm:px-10 md:px-16 py-6 sm:py-10 flex flex-col">

      <nav className="flex flex-wrap items-center justify-between mb-12 gap-y-4">
        <div className="text-teal-600 font-bold text-xl cursor-pointer">PyBot</div>
        <ul className="flex flex-wrap gap-x-6 text-base sm:text-lg font-semibold">
          <li className="cursor-pointer hover:text-teal-600 transition" onClick={() => scrollToSection('home')}>Hogar</li>
          <li className="cursor-pointer hover:text-teal-600 transition" onClick={() => scrollToSection('about-us')}>Sobre nosotros</li>
          <li className="cursor-pointer hover:text-teal-600 transition" onClick={() => scrollToSection('services')}>Servicios</li>
          <li className="cursor-pointer hover:text-teal-600 transition" onClick={() => scrollToSection('contact-us')}>Contáctanos</li>
        </ul>
        <button
          onClick={handleSignUpClick}
          className="bg-teal-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-teal-700 transition"
        >
          Inscribirse
        </button>
      </nav>

      <main className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 flex-1">
        <motion.div
          ref={mainTextRef}
          className="max-w-lg space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 60 }}
          animate={mainTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Nosotros <span className="text-teal-600">solucionamos</span> tu limpieza
          </h1>
          <p className="text-gray-500 leading-relaxed">
            ¡No te pierdas esta gran oportunidad y únete a nosotros! Deja que la tecnología se encargue de la limpieza, mientras tú te ocupas de lo que realmente importa.
          </p>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
            Empezar
          </button>
          <div className="flex items-center justify-center md:justify-start space-x-3 cursor-pointer select-none">
            <div className="p-1 bg-white rounded-full shadow-md">
              <FaHeart className="text-red-500" />
            </div>
            <span className="font-semibold">Empieza ahora</span>
          </div>
        </motion.div>

        <motion.div
          ref={mainImageRef}
          className="max-w-xl"
          initial={{ opacity: 0, y: 80 }}
          animate={mainImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 1.2 }}
        >
          <img src={robotImage} alt="Robot" className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto" />
        </motion.div>
      </main>

      <motion.footer
        ref={servicesRef}
        id="services"
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xl font-semibold">
          Brindamos los mejores <span className="text-teal-600">servicios</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Introduce tus datos personales y empieza con nosotros.
        </p>
      </motion.footer>

      <section className="mt-24">
        <motion.div
  ref={cardsRef}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
  initial={{ opacity: 0, y: 40 }}
  animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 1 }}
>
  <div className="bg-white shadow-md p-6 rounded-md">
    <div className="w-8 h-4 bg-yellow-400 rounded-md mb-4" />
    <h3 className="font-bold text-lg mb-2">Venta de robots de limpieza</h3>
    <p className="text-gray-500 text-sm">Modelos adaptados a diferentes espacios, presupuestos y necesidades.</p>
  </div>

  <div className="bg-white shadow-md p-6 rounded-md">
    <div className="w-8 h-4 bg-green-500 rounded-md mb-4" />
    <h3 className="font-bold text-lg mb-2">Actualizaciones de software</h3>
    <p className="text-gray-500 text-sm">Mantenemos tu robot siempre actualizado con lo último en tecnología inteligente.</p>
  </div>

  <div className="bg-white shadow-md p-6 rounded-md">
    <div className="w-8 h-4 bg-purple-600 rounded-md mb-4" />
    <h3 className="font-bold text-lg mb-2">Instalación y formación</h3>
    <p className="text-gray-500 text-sm">Nos encargamos de dejar tu equipo listo y operativo.</p>
  </div>

  <div className="bg-white shadow-md p-6 rounded-md">
    <div className="w-8 h-4 bg-red-600 rounded-md mb-4" />
    <h3 className="font-bold text-lg mb-2">Otros</h3>
    <p className="text-gray-500 text-sm">Revisión de software y hardware.</p>
  </div>
</motion.div>


        <motion.div
          ref={simpleSolutionsRef}
          className="bg-[#c2e2de] rounded-lg p-10 flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0"
          initial={{ opacity: 0, y: 40 }}
          animate={simpleSolutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={robotImage} alt="Robot Assistant" className="w-40 sm:w-60 md:w-72 h-auto" />
          </div>
          <div className="w-full lg:w-1/2 space-y-5">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700">
    <span className="text-gray-800">Soluciones</span>{' '}
    <span className="text-teal-600">Sencillas!</span>
  </h2>
  <p className="text-gray-700">
    Introduce tus datos personales y comienza tu viaje con nosotros.
  </p>

  <div className="flex items-start space-x-4">
    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
      1
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">Crear una cuenta</h4>
      <p className="text-sm text-gray-600">Complete su información personal para comenzar.</p>
    </div>
  </div>

  <div className="flex items-start space-x-4">
    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
      2
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">Navegar</h4>
      <p className="text-sm text-gray-600">Visualiza las diferentes opciones que tienes.</p>
    </div>
  </div>

  <div className="flex items-start space-x-4">
    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
      3
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">mira tus gráficos</h4>
      <p className="text-sm text-gray-600">Revisa tus diferentes gráficos.</p>
    </div>
  </div>

  <div className="flex items-start space-x-4">
    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
      4
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">Disfruta de los beneficios</h4>
      <p className="text-sm text-gray-600">Accede a funciones y ofertas exclusivas.</p>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
    <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
      Empezar
    </button>
    <button className="border border-teal-600 text-teal-600 px-6 py-2 rounded-md hover:bg-teal-50">
      Empezar
    </button>
  </div>
</div>

        </motion.div>
      </section>

      <motion.section
        ref={aboutUsRef}
        id="about-us"
        className="bg-[#f7f7ec] py-20 px-6 sm:px-10"
        initial={{ opacity: 0, y: 60 }}
        animate={aboutUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20 space-y-10 lg:space-y-0">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Nuestra <span className="text-teal-600">Agencia</span>
            </h2>
            <p className="text-gray-600">
              Buscamos hacer más fácil la limpieza del hogar y al mismo tiempo generar un gran cambio.
            </p>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700">
              Empezar
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img src={robotImage} alt="Spy Robot" className="w-40 sm:w-60 h-auto" />
          </div>
        </div>

        <div ref={clientsRef} className="text-center mb-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 60 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1 }}
          >
            Lo que dicen <span className="text-teal-600">Nuestros</span> clientes!
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: 60 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Introduce tus datos personales y comienza tu viaje con nosotros.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <motion.div
    className="relative bg-white shadow-md p-6 rounded-lg border-t-4 border-yellow-400"
    initial={{ opacity: 0, y: 30 }}
    animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.6, delay: 0 }}
  >
    <div className="absolute -top-3 left-5 w-4 h-4 rounded-full bg-yellow-400"></div>
    <div className="flex items-center space-x-4 mb-4">
      <img src="https://i.pravatar.cc/100?img=3" alt="Client" className="w-10 h-10 rounded-full border" />
      <div>
        <h4 className="text-teal-600 font-semibold">Oscar Torres</h4>
        <p className="text-gray-500 text-sm">Texto único para Oscar.</p>
      </div>
    </div>
    <div className="flex mt-4 text-yellow-400">
      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
    </div>
    <div className="absolute -bottom-3 right-5 w-4 h-4 rounded-full bg-yellow-400"></div>
  </motion.div>

  <motion.div
    className="relative bg-white shadow-md p-6 rounded-lg border-t-4 border-orange-400"
    initial={{ opacity: 0, y: 30 }}
    animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <div className="absolute -top-3 left-5 w-4 h-4 rounded-full bg-orange-400"></div>
    <div className="flex items-center space-x-4 mb-4">
      <img src="https://i.pravatar.cc/100?img=4" alt="Client" className="w-10 h-10 rounded-full border" />
      <div>
        <h4 className="text-teal-600 font-semibold">Laura Méndez</h4>
        <p className="text-gray-500 text-sm">Comentario diferente para Laura.</p>
      </div>
    </div>
    <div className="flex mt-4 text-yellow-400">
      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
    </div>
    <div className="absolute -bottom-3 right-5 w-4 h-4 rounded-full bg-orange-400"></div>
  </motion.div>

  <motion.div
    className="relative bg-white shadow-md p-6 rounded-lg border-t-4 border-red-500"
    initial={{ opacity: 0, y: 30 }}
    animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <div className="absolute -top-3 left-5 w-4 h-4 rounded-full bg-red-500"></div>
    <div className="flex items-center space-x-4 mb-4">
      <img src="https://i.pravatar.cc/100?img=5" alt="Client" className="w-10 h-10 rounded-full border" />
      <div>
        <h4 className="text-teal-600 font-semibold">Carlos Ramírez</h4>
        <p className="text-gray-500 text-sm">Una opinión diferente de Carlos.</p>
      </div>
    </div>
    <div className="flex mt-4 text-yellow-400">
      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
    </div>
    <div className="absolute -bottom-3 right-5 w-4 h-4 rounded-full bg-red-500"></div>
  </motion.div>

  <motion.div
    className="relative bg-white shadow-md p-6 rounded-lg border-t-4 border-green-500"
    initial={{ opacity: 0, y: 30 }}
    animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.6, delay: 0.6 }}
  >
    <div className="absolute -top-3 left-5 w-4 h-4 rounded-full bg-green-500"></div>
    <div className="flex items-center space-x-4 mb-4">
      <img src="https://i.pravatar.cc/100?img=6" alt="Client" className="w-10 h-10 rounded-full border" />
      <div>
        <h4 className="text-teal-600 font-semibold">Fernanda López</h4>
        <p className="text-gray-500 text-sm">Testimonio distinto de Fernanda.</p>
      </div>
    </div>
    <div className="flex mt-4 text-yellow-400">
      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
    </div>
    <div className="absolute -bottom-3 right-5 w-4 h-4 rounded-full bg-green-500"></div>
  </motion.div>
</div>

      </motion.section>

      <div id="contact-us">
        <Footer />
      </div>
    </div>
  )
}
