"use client" // Mark this component as a client component

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield } from 'lucide-react'

// Mock user data - replace with actual API calls
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', relatedClass: 'Math 101' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', relatedClass: 'Science 202' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'student', relatedClass: 'History 303' },
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newRole, setNewRole] = useState('')

  // Simulate fetching users from API
  useEffect(() => {
    // Replace with actual API call
    // fetchUsers().then(data => setUsers(data))
  }, [])

  const openModal = (user) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
    setNewRole('')
  }

  const handleRoleUpdate = () => {
    // Replace with actual API call
    // updateRole(selectedUser.id, newRole).then(() => {
    //   setUsers(users.map(u => u.id === selectedUser.id ? {...u, role: newRole} : u))
    //   closeModal()
    // })
    setUsers(users.map(u => u.id === selectedUser.id ? {...u, role: newRole} : u))
    closeModal()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Related Class/Case</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.relatedClass}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(user)}
                    >
                      Edit Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Update User Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>User</Label>
                  <Input value={selectedUser?.name} disabled />
                </div>
                <div>
                  <Label>Current Role</Label>
                  <Input value={selectedUser?.role} disabled />
                </div>
                <div>
                  <Label>New Role</Label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleRoleUpdate}>Update Role</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}