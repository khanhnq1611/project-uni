"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash, Users } from 'lucide-react'

// Mock data for demonstration
const initialClasses = [
  {
    id: '1',
    name: 'Mathematics 101',
    students: ['Alice', 'Bob', 'Charlie'],
    leader: 'Alice',
    manager: 'Bob'
  },
  {
    id: '2',
    name: 'Physics 201',
    students: ['David', 'Eve', 'Frank'],
    leader: 'David',
    manager: 'Eve'
  }
]

export default function ClassManagementPage() {
  const [classes, setClasses] = useState(initialClasses)
  const [newClassName, setNewClassName] = useState('')
  const [newStudents, setNewStudents] = useState('')
  const [selectedClass, setSelectedClass] = useState(null)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)

  const handleCreateClass = () => {
    if (!newClassName || !newStudents) return
    
    const newClass = {
      id: String(classes.length + 1),
      name: newClassName,
      students: newStudents.split(',').map(s => s.trim()),
      leader: '',
      manager: ''
    }
    
    setClasses([...classes, newClass])
    setNewClassName('')
    setNewStudents('')
  }

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id))
  }

  const handleAssignRoles = (classId) => {
    const selected = classes.find(c => c.id === classId)
    setSelectedClass(selected)
    setIsRoleModalOpen(true)
  }

  const handleSaveRoles = (updatedClass) => {
    setClasses(classes.map(c => c.id === updatedClass.id ? updatedClass : c))
    setIsRoleModalOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Class Management</h1>

      {/* Class Creation Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Class</h2>
        <div className="space-y-4">
          <Input
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <Input
            placeholder="Students (comma separated)"
            value={newStudents}
            onChange={(e) => setNewStudents(e.target.value)}
          />
          <Button onClick={handleCreateClass} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Class
          </Button>
        </div>
      </div>

      {/* Class List Table */}
      <Table>
        <TableCaption>List of all classes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Leader</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{cls.name}</TableCell>
              <TableCell>{cls.students.join(', ')}</TableCell>
              <TableCell>{cls.leader}</TableCell>
              <TableCell>{cls.manager}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteClass(cls.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleAssignRoles(cls.id)}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Role Assignment Modal */}
      {selectedClass && (
        <RoleAssignmentModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          cls={selectedClass}
          onSave={handleSaveRoles}
        />
      )}
    </div>
  )
}

function RoleAssignmentModal({ isOpen, onClose, cls, onSave }) {
  const [leader, setLeader] = useState(cls.leader)
  const [manager, setManager] = useState(cls.manager)

  const handleSave = () => {
    onSave({
      ...cls,
      leader,
      manager
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Roles for {cls.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Class Leader</label>
            <select
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Leader</option>
              {cls.students.map(student => (
                <option key={student} value={student}>{student}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Class Manager</label>
            <select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Manager</option>
              {cls.students.map(student => (
                <option key={student} value={student}>{student}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}