"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, BookOpen } from 'lucide-react'

type User = {
  id: number
  name: string
  role: 'admin' | 'user'
}

const mockUser: User = {
  id: 1,
  name: 'Admin User',
  role: 'admin'
}

export default function AdminPage() {
//   const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

//   useEffect(() => {
//     // Simulate async auth check
//     setUser(mockUser)
//   }, [])

//   useEffect(() => {
//     // Redirect only after user state is set
//     if (user?.role !== 'admin') {
//       router.push('/')
//     }
//   }, [user, router])

//   if (!user || user?.role !== 'admin') {
//     return null // or loading spinner
//   }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6" />
              <CardTitle>User Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-gray-500">
              Manage user accounts, roles, and permissions.
            </p>
            <Button onClick={() => router.push('/dashboard/admin/user-management')}>
              Go to User Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BookOpen className="h-6 w-6" />
              <CardTitle>Class Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-gray-500">
              Create, update, and manage classes and courses.
            </p>
            <Button onClick={() => router.push('/dashboard/admin/class-management')}>
              Go to Class Management
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}