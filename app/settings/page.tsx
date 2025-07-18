import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getUserById } from '@/lib/cosmic'
import { verifyToken } from '@/lib/auth'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  let user
  try {
    const decoded = await verifyToken(token)
    
    if (!decoded || !decoded.userId) {
      redirect('/login')
    }
    
    user = await getUserById(decoded.userId)
    
    if (!user) {
      redirect('/login')
    }
  } catch (error) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600 mb-8">Update your profile information and preferences.</p>
            
            <SettingsForm user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}