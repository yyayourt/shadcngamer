'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { Facebook, Instagram, Twitch, ChevronDown, Menu, Clock, MapPin, Phone, Mail, Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for Leaflet icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function Button({ children, className, ...props }) {
  const { theme } = useTheme()
  return (
    <button
      className={`px-4 py-2 rounded font-semibold transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white'
          : 'bg-gradient-to-r from-purple-400 to-blue-300 hover:from-purple-300 hover:to-blue-200 text-gray-800'
      } shadow-lg hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Card({ children, className, ...props }) {
  const { theme } = useTheme()
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800 border border-purple-500' : 'bg-white border border-purple-300'
      } ${className}`}
      style={{
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(to bottom right, rgba(128, 90, 213, 0.1), rgba(49, 168, 255, 0.1))'
          : 'linear-gradient(to bottom right, rgba(128, 90, 213, 0.05), rgba(49, 168, 255, 0.05))',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function CybergamerLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'} z-50 border-b ${theme === 'dark' ? 'border-purple-500' : 'border-purple-300'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
            Cybergamer
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {['Présentation', 'Jeux', 'Événements', 'Tarifs', 'Contact', 'Horaires'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`hover:text-purple-400 transition-colors relative group ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {item}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleTheme} className="p-2">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu />
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} py-4`}>
            <ul className="flex flex-col items-center space-y-4">
              {['Présentation', 'Jeux', 'Événements', 'Tarifs', 'Contact', 'Horaires'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className={`hover:text-purple-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} onClick={() => setMenuOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Présentation */}
        <section id="présentation" className={`py-20 ${theme === 'dark' ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className={`text-5xl font-bold mb-8 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
                  Bienvenue chez Cybergamer
                </h2>
                <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Plongez dans l'univers futuriste de Cybergamer, où la réalité rencontre le virtuel. Nos installations de pointe vous propulsent dans une expérience gaming sans précédent. Préparez-vous pour des sessions intenses, des compétitions électrisantes et des soirées à thème qui défient l'imagination.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Cybergamer Gaming Setup"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Jeux */}
        <section id="jeux" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
              Arsenal de Jeux
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Call of Duty: Warzone', description: 'Bataille royale tactique', image: '/placeholder.svg?height=200&width=300' },
                { name: 'FIFA 24', description: 'Simulation de football ultime', image: '/placeholder.svg?height=200&width=300' },
                { name: 'League of Legends', description: 'Arène stratégique multijoueur', image: '/placeholder.svg?height=200&width=300' },
                { name: 'Rocket League', description: 'Football futuriste motorisé', image: '/placeholder.svg?height=200&width=300' },
                { name: 'Fortnite', description: 'Battle royale créatif', image: '/placeholder.svg?height=200&width=300' },
              ].map((game) => (
                <Card key={game.name} className="group">
                  <div className="relative">
                    <Image
                      src={game.image}
                      alt={game.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 relative">
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{game.name}</h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{game.description}</p>
                    <Button className="w-full transform group-hover:scale-105 transition-transform duration-300">
                      Découvrir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Événements */}
        <section id="événements" className={`py-20 ${theme === 'dark' ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
              Événements Épiques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Tournoi Cyberpunk 2077', date: 'Tous les samedis' },
                { name: 'Nuit Rétro Arcade', date: 'Dernier vendredi du mois' },
              ].map((event) => (
                <Card key={event.name} className="group cursor-pointer">
                  <div className="p-6 relative overflow-hidden">
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-600 to-blue-500' : 'bg-gradient-to-br from-purple-200 to-blue-200'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{event.name}</h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{event.date}</p>
                    <ChevronDown className={`mt-4 transform group-hover:translate-y-1 transition-transform duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
              Tarifs Compétitifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Session PC Gamer', price: '1500 FCFA / heure' },
                { name: 'Session Console Next-Gen', price: '2000 FCFA / heure' },
                { name: 'Pass Cyborg Illimité', price: '10000 FCFA / jour' },
              ].map((tarif) => (
                <Card key={tarif.name} className="group">
                  <div className="p-6 relative overflow-hidden">
                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-purple-500' : 'bg-gradient-to-br from-blue-200 to-purple-200'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-100'   : 'text-gray-800'}`}>{tarif.name}</h3>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500' : 'text-blue-600'}`}>{tarif.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact et Horaires */}
        <section id="contact" className={`py-20 ${theme === 'dark' ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>
              Contact et Horaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <MapPin className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Rue des Cyborgs, Abidjan, Côte d'Ivoire</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>+225 07 07 07 07 07</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>contact@cybergamer.ci</span>
                  </li>
                </ul>
                <div className="mt-6 h-64 rounded-lg overflow-hidden">
                  <MapContainer center={[5.3364, -4.0267]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url={theme === 'dark' 
                        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      }
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[5.3364, -4.0267]}>
                      <Popup>
                        Cybergamer <br /> Rue des Cyborgs, Abidjan
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'}`}>Horaires</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Clock className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Lundi - Vendredi : 10h - 23h</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Samedi : 12h - 02h</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className={`mr-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'}`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Dimanche : 14h - 22h</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-12 border-t ${theme === 'dark' ? 'border-purple-500' : 'border-purple-300'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500' : 'text-purple-600'} mb-4 md:mb-0`}>
              Cybergamer
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-500' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                <Facebook size={24} />
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-500' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                <Instagram size={24} />
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-500' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                <Twitch size={24} />
              </a>
            </div>
          </div>
          <div className={`mt-8 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            <p>&copy; 2024 Cybergamer. Tous droits réservés dans ce monde et le métaverse.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function CybergamerLandingEnhanced() {
  return (
    <ThemeProvider>
      <CybergamerLanding />
    </ThemeProvider>
  )
}