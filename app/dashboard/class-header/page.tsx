"use client";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from 'lucide-react'

interface Student {
  id: string
  name: string
  achievement: {
    id: string
    name: string
    status: 'pending' | 'confirmed' | 'rejected'
  } | null
}

interface Achievement {
  id: string
  name: string
  description: string
  evidence: string
  status: 'pending' | 'confirmed' | 'rejected'
}

export default function ClassLeaderDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [validationReason, setValidationReason] = useState('')

  useEffect(() => {
    // Mock data for demonstration
    const mockStudents: Student[] = [
      { id: '1', name: 'John Doe', achievement: { id: 'a1', name: 'Math Whiz', status: 'pending' } },
      { id: '2', name: 'Jane Smith', achievement: { id: 'a2', name: 'Science Star', status: 'confirmed' } },
      { id: '3', name: 'Bob Johnson', achievement: null },
    ]
    setStudents(mockStudents)
  }, [])

  const openModal = (student: Student) => {
    if (student.achievement) {
      // Mock achievement data
      const mockAchievement: Achievement = {
        id: student.achievement.id,
        name: student.achievement.name,
        description: 'Detailed description of the achievement',
        evidence: 'https://example.com/evidence.pdf',
        status: student.achievement.status
      }
      setSelectedAchievement(mockAchievement)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAchievement(null)
    setValidationReason('')
  }

  const handleConfirm = () => {
    if (selectedAchievement) {
      // Send confirmation to API
      console.log('Confirmed achievement:', selectedAchievement.id)
      closeModal()
    }
  }

  const handleReject = () => {
    if (selectedAchievement && validationReason) {
      // Send rejection to API
      console.log('Rejected achievement:', selectedAchievement.id, 'Reason:', validationReason)
      closeModal()
    }
  }

  const submittedCount = students.filter(s => s.achievement !== null).length
  const submissionPercentage = Math.round((submittedCount / students.length) * 100)

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Class Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">
              Achievements Submitted: {submissionPercentage}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${submissionPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {student.achievement?.name || 'No achievement'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      student.achievement?.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      student.achievement?.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.achievement?.status || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {student.achievement && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(student)}
                      >
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>{selectedAchievement.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{selectedAchievement.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Evidence</h3>
                <a
                  href={selectedAchievement.evidence}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Evidence
                </a>
              </div>
              {selectedAchievement.status === 'pending' && (
                <div>
                  <h3 className="font-semibold mb-2">Rejection Reason</h3>
                  <Input
                    value={validationReason}
                    onChange={(e) => setValidationReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
              {selectedAchievement.status === 'pending' && (
                <>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    disabled={!validationReason}
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button onClick={handleConfirm}>
                    <Check className="mr-2 h-4 w-4" /> Confirm
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}