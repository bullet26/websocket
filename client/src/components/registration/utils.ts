// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup'

export const initialValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
}

export const validationSchema = Yup.object({
  name: Yup.string().required('Required field!'),
  surname: Yup.string().min(3, 'Minimum 3 letters to fill').required('Required field!'),
  email: Yup.string().email().required('Required field!'),
  password: Yup.string().min(4, 'Minimum 4 symbols'),
})
