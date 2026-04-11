import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'reporter' | 'student_journalist' | 'teacher' | 'advertiser'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const isEditorOrAbove: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['admin', 'editor'].includes(user.role)
}

export const isReporterOrAbove: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['admin', 'editor', 'reporter'].includes(user.role)
}

export const isTeacher: Access = ({ req: { user } }) => {
  return user?.role === 'teacher'
}

export const isStudentJournalist: Access = ({ req: { user } }) => {
  return user?.role === 'student_journalist'
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isPublished: Access = () => {
  return { status: { equals: 'published' } }
}

export const isPublishedOrEditorOrAbove: Access = ({ req: { user } }) => {
  if (user && ['admin', 'editor'].includes(user.role)) return true
  return { status: { equals: 'published' } }
}

export const canReadOwnOrEditorial: Access = ({ req: { user } }) => {
  if (!user) return false
  if (['admin', 'editor'].includes(user.role)) return true
  return { author: { equals: user.id } }
}

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'admin'
}
