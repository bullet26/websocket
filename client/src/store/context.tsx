import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface AuthContextProps {
  user: object
  isAuth: boolean
  isLoading: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setUser: Dispatch<SetStateAction<object>>
}

export const AuthContext = createContext<AuthContextProps>({
  user: {},
  isAuth: false,
  isLoading: false,
  setIsAuth: () => {},
  setUser: () => {},
  setIsLoading: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
