// components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import type { JSX } from 'react'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth)

  if (loading) return <p>Cargando...</p>
  if (!user) return <Navigate to="/" />
  return children
}
