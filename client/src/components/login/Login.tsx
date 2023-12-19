import { FC } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, Form } from 'formik'
import { Button } from 'antd'
import { login } from 'api'
import { useAuthContext } from 'store'
import { Input } from 'UI'
import { initialValues, validationSchema } from './utils'

export const Login: FC = () => {
  const { setIsAuth, setUser } = useAuthContext()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const res = await login(values)
          console.log(res)
          localStorage.setItem('token', res?.accessToken)
          setIsAuth(true)
          setUser(res?.user)
          resetForm()
        } catch (error) {
          console.log(error)
        }
      }}>
      <Form>
        <Input name="email" placeholder="Type email" />
        <Input name="password" placeholder="Type password" />
        <Button htmlType="submit" type="primary" size="large">
          Submit
        </Button>
      </Form>
    </Formik>
  )
}
