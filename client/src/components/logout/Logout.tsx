import { Button } from 'antd'
import { logout } from 'api'
import { useAuthContext } from 'store'

export const Logout = () => {
  const { setIsAuth, setUser } = useAuthContext()

  const HandleClick = async () => {
    localStorage.removeItemItem('token')
    await logout()
    setIsAuth(false)
    setUser({})
  }

  return <Button onClick={HandleClick}>Logout</Button>
}
