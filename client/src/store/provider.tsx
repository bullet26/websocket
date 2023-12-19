import { FC, useState } from 'react'
import { AuthContext } from 'store'

interface ContextProviderProps {
  children: React.ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        setIsAuth,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
