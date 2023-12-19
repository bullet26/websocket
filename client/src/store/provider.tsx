import { FC, useState } from 'react'
import { AuthContext } from 'store'

interface ContextProviderProps {
  children: React.ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        setIsAuth,
        setUser,
        setIsLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
