import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface AuthContextProps {
  user: object
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setUser: Dispatch<SetStateAction<object>>
}

export const AuthContext = createContext<AuthContextProps>({
  user: {},
  isAuth: false,
  setIsAuth: () => {},
  setUser: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
