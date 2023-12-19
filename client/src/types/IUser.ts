export interface IUser {
  email: string
  name: string
  surname: string
  role: 'Teacher' | 'Admin' | 'Student'
  id: string
}
