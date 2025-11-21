import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/diary', label: 'Diary' },
  { to: '/star-jar', label: 'StarJar' },
  { to: '/countdown', label: 'Countdown' },
  { to: '/photo-board', label: 'PhotoBoard' },
  { to: '/missions', label: 'Missions' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="navbar fixed left-0 top-0 z-50 w-full bg-base-100/80 backdrop-blur-md shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <NavLink to="/" className="font-extrabold text-xl text-primary">
            Noey & Top
          </NavLink>
        </div>
        <div className="flex-none">
          <div className="md:hidden dropdown dropdown-end">
            <button
              className="btn btn-ghost rounded-full"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {open && (
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white/90 rounded-box w-52">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `rounded-full px-3 font-medium ${isActive ? 'bg-primary text-primary-content' : ''}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="hidden md:flex menu menu-horizontal rounded-full bg-white/70 px-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 font-medium ${isActive ? 'bg-primary text-primary-content' : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
