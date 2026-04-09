import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'farias_estofados_user'
const MOCK_CREDENTIALS = {
  login: 'admin',
  password: '123456',
  fullName: 'Victor Faria da Silva',
  email: 'admin@fariasestofados.com.br',
  age: 29,
  cpf: '123.456.789-00',
  birthDate: '14/08/1996',
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Falha ao restaurar sessao:', error)
    } finally {
      setIsLoadingAuth(false)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,
      login({ login, password }) {
        if (login !== MOCK_CREDENTIALS.login || password !== MOCK_CREDENTIALS.password) {
          return {
            success: false,
            message: 'Login ou senha invalidos.',
          }
        }

        const nextUser = {
          login: MOCK_CREDENTIALS.login,
          fullName: MOCK_CREDENTIALS.fullName,
          email: MOCK_CREDENTIALS.email,
          age: MOCK_CREDENTIALS.age,
          cpf: MOCK_CREDENTIALS.cpf,
          birthDate: MOCK_CREDENTIALS.birthDate,
        }

        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
        setUser(nextUser)

        return {
          success: true,
          user: nextUser,
        }
      },
      logout() {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setUser(null)
      },
      navigateToLogin() {},
      checkAppState() {},
    }),
    [isLoadingAuth, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
