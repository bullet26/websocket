import { FC, useState, useEffect } from 'react'
import { Button } from 'antd'
import { useAuthContext } from 'store'
import { checkAuth } from 'api'
import { WS, Login, Registration, Logout } from 'components'

export const App: FC = () => {
  const [showLogin, setShowLoginStatus] = useState(false)
  const { isAuth, setIsAuth, setUser, isLoading, setIsLoading } = useAuthContext()

  const checkAuthInit = async () => {
    try {
      setIsLoading(true)
      const res = await checkAuth()
      localStorage.setItem('token', res?.accessToken)
      setIsAuth(true)
      setUser(res?.user)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuthInit()
    }
  }, [])

  if (isLoading) {
    return <div>loading...</div>
  }

  return !isAuth ? (
    showLogin ? (
      <>
        <Login />
        <div>
          You don`&apos;`t register?
          <Button
            onClick={() => {
              setShowLoginStatus(false)
            }}>
            Show registration
          </Button>
        </div>
      </>
    ) : (
      <>
        <Registration />
        <div>
          Already registered?
          <Button
            onClick={() => {
              setShowLoginStatus(true)
            }}>
            Show login
          </Button>
        </div>
      </>
    )
  ) : (
    <>
      <Logout />
      <WS />
    </>
  )
}
