import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import StarJar from './pages/StarJar'
import Countdown from './pages/Countdown'
import PhotoBoard from './pages/PhotoBoard'
import Missions from './pages/Missions'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <main className="container mx-auto px-4 pb-24 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/star-jar" element={<StarJar />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/photo-board" element={<PhotoBoard />} />
          <Route path="/missions" element={<Missions />} />
          <Route
            path="*"
            element={
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Page not found</h2>
                <NavLink to="/" className="btn btn-primary mt-4">
                  Go Home
                </NavLink>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

