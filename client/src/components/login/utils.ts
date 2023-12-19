// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup'

export const initialValues = {
  email: '',
  password: '',
}

export const validationSchema = Yup.object({
  email: Yup.string().email().required('Required field!'),
  password: Yup.string().min(4, 'Minimum 4 symbols'),
})
