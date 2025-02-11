"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Edit } from 'lucide-react'

type Achievement = {
  id: string
  title: string
  description: string
  status: 'pending' | 'confirmed' | 'rejected'
  deadline: string
  feedback?: string
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'React Project',
    description: 'Built a todo app using React',
    status: 'confirmed',
    deadline: '2023-12-31',
    feedback: 'Great work! The app is well-structured and functional.'
  },
  {
    id: '2',
    title: 'Node.js API',
    description: 'Created a REST API using Express',
    status: 'pending',
    deadline: '2023-12-31'
  },
  {
    id: '3',
    title: 'Database Design',
    description: 'Designed a relational database schema',
    status: 'rejected',
    deadline: '2023-12-31',
    feedback: 'Needs improvement in normalization.'
  }
]

export default function AssessmentHistory() {
  const [achievements] = useState<Achievement[]>(mockAchievements)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleEditClick = (achievement: Achievement) => {
    if (new Date(achievement.deadline) < new Date()) return
    setEditingAchievement(achievement)
    setEditTitle(achievement.title)
    setEditDescription(achievement.description)
  }

  const handleSave = () => {
    // Here you would make an API call to update the achievement
    setEditingAchievement(null)
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Achievement History</h1>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{achievement.title}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-sm ${statusColors[achievement.status]}`}>
                  {achievement.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{achievement.description}</p>
              
              {achievement.feedback && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold mb-2">Feedback:</h3>
                  <p>{achievement.feedback}</p>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleEditClick(achievement)}
                  disabled={new Date(achievement.deadline) < new Date()}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Achievement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Title</label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingAchievement(null)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}