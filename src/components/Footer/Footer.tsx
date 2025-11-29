import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#b5dedb] text-white">
      {/* CTA Banner */}
      <div className="bg-[#33a9a4] w-full py-6 px-10 flex flex-col md:flex-row items-center justify-between rounded-b-md">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">¿Listo para comenzar?</h2>
        <button className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#33a9a4] transition">
          Contáctenos
        </button>
      </div>

      {/* Footer Content */}
      <div className="py-16 px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Socials */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">PyBot</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl bg-white p-2 rounded-full text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="text-2xl bg-white p-2 rounded-full text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl bg-white p-2 rounded-full text-sky-500">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-lg mb-3">Compañia</h4>
          <ul className="space-y-2 text-sm">
            <li>Acerca de</li>
            <li>Contacto</li>
            <li>camping</li>
            <li>Resina</li>
          </ul>
        </div>

        {/* Designs */}
        <div>
          <h4 className="font-bold text-lg mb-3">Diseños</h4>
          <ul className="space-y-2 text-sm">
            <li>Debilidad del diseño</li>
            <li>Vida del programa</li>
            <li>fuente de acampada</li>
            <li>Louc</li>
            <li>Precios</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold text-lg mb-3">Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li>Debilidad del diseño</li>
            <li>Traer</li>
            <li>fuente de acampada</li>
            <li>Louc</li>
            <li>Precios</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
