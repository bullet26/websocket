import { FC, useState } from 'react'
import { Button } from 'antd'
import { ContextProvider, useAuthContext } from 'store'
import { WS, Login, Registration, Logout } from 'components'

export const App: FC = () => {
  const [showLogin, setShowLoginStatus] = useState(false)
  const { isAuth } = useAuthContext()

  return (
    <ContextProvider>
      {!isAuth ? (
        showLogin ? (
          <>
            <Login />
            <div>
              You don't register?
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
      )}
    </ContextProvider>
  )
}
