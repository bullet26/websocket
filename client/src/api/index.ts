import ky from 'ky'
import { AuthResponse } from 'types/AuthResponse'
import { IUser } from 'types/IUser'

const baseURL = import.meta.env.VITE_API_BASE_URL
const accessToken = localStorage.getItem('token')
const $request = ky.create({
  prefixUrl: `${baseURL}/api`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  hooks: {
    afterResponse: [
      // eslint-disable-next-line consistent-return
      async (request, options, response) => {
        if (response.status === 401) {
          // unauthorized
          const token = await ky(`${baseURL}/api/users/refresh`).text()
          localStorage.setItem('token', token)
          request.headers.set('Authorization', `Bearer ${token}`)
          return ky(request)
        }
      },
    ],
    beforeRetry: [
      // eslint-disable-next-line consistent-return
      async ({ request, options, error, retryCount }) => {
        if (retryCount > 2) {
          return ky.stop
        }
      },
    ],
  },
})

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<AuthResponse> => {
  try {
    const response: AuthResponse = await $request
      .post('users/login', { json: { email, password } })
      .json()
    return response
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await $request.post('users/logout', { json: {} }).json()
    return response
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    throw error
  }
}

export const registration = async ({
  email,
  password,
  name,
  surname,
}: {
  email: string
  password: string
  name: string
  surname: string
}): Promise<AuthResponse> => {
  try {
    const res: AuthResponse = await $request
      .post('users/registration', { json: { email, password, name, surname } })
      .json()
    return res
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    throw error
  }
}

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const res: IUser[] = await $request.get('users/').json()
    return res
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    throw error
  }
}
