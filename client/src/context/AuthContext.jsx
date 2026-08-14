import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('jwt')
    return stored ? JSON.parse(stored) : null
  })

  const signin = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
    setAuth(data)
  }

  const signout = () => {
    localStorage.removeItem('jwt')
    setAuth(null)
  }

  const isAdmin = auth?.user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ auth, signin, signout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}