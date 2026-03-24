import { notFound } from 'next/navigation'
import AdminTestDashboard from './AdminTestDashboard'

export default function AdminTestPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <AdminTestDashboard />
}
