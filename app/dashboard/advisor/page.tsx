"use client";
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash, Edit, Check, X } from 'lucide-react'

export default function AdvisorDashboard() {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Mathematics 101', status: 'pending' },
    { id: 2, name: 'Physics 201', status: 'confirmed' },
    { id: 3, name: 'Chemistry 301', status: 'rejected' }
  ])

  const [criteria, setCriteria] = useState([
    { id: 1, name: 'Attendance', weight: 30 },
    { id: 2, name: 'Participation', weight: 20 },
    { id: 3, name: 'Exam Score', weight: 50 }
  ])

  const [newCriterion, setNewCriterion] = useState({ name: '', weight: '' })
  const [editingCriterion, setEditingCriterion] = useState<{ id: number | null, name: string, weight: string }>({ id: null, name: '', weight: '' })

  const summaryData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 90 },
    { month: 'Apr', score: 88 },
    { month: 'May', score: 95 }
  ]

  const handleClassAction = (id: number, action: 'confirm' | 'reject') => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, status: action === 'confirm' ? 'confirmed' : 'rejected' } : cls
    ))
  }

  const addCriterion = () => {
    if (newCriterion.name && newCriterion.weight) {
      setCriteria(prev => [
        ...prev,
        { id: Date.now(), name: newCriterion.name, weight: parseInt(newCriterion.weight) }
      ])
      setNewCriterion({ name: '', weight: '' })
    }
  }

  const deleteCriterion = (id: number) => {
    setCriteria(prev => prev.filter(c => c.id !== id))
  }

  const startEditCriterion = (criterion: { id: number, name: string, weight: number }) => {
    setEditingCriterion({ id: criterion.id, name: criterion.name, weight: criterion.weight.toString() })
  }

  const saveEditCriterion = () => {
    if (editingCriterion.id && editingCriterion.name && editingCriterion.weight) {
      setCriteria(prev => prev.map(c => 
        c.id === editingCriterion.id 
          ? { ...c, name: editingCriterion.name, weight: parseInt(editingCriterion.weight) }
          : c
      ))
      setEditingCriterion({ id: null, name: '', weight: '' })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Class List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Managed Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of classes you manage</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map(cls => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      cls.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      cls.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cls.status}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleClassAction(cls.id, 'confirm')}
                      disabled={cls.status === 'confirmed'}
                    >
                      <Check className="h-4 w-4 mr-1" /> Confirm
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleClassAction(cls.id, 'reject')}
                      disabled={cls.status === 'rejected'}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Criteria Manager */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Criterion Name"
              value={newCriterion.name}
              onChange={e => setNewCriterion(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input 
              type="number"
              placeholder="Weight (%)"
              value={newCriterion.weight}
              onChange={e => setNewCriterion(prev => ({ ...prev, weight: e.target.value }))}
            />
          </div>
          <Button onClick={addCriterion}>Add Criterion</Button>

          <div className="space-y-2">
            {criteria.map(criterion => (
              <div key={criterion.id} className="flex items-center justify-between p-2 border rounded">
                {editingCriterion.id === criterion.id ? (
                  <div className="flex space-x-2">
                    <Input
                      value={editingCriterion.name}
                      onChange={e => setEditingCriterion(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="number"
                      value={editingCriterion.weight}
                      onChange={e => setEditingCriterion(prev => ({ ...prev, weight: e.target.value }))}
                    />
                    <Button onClick={saveEditCriterion}>Save</Button>
                  </div>
                ) : (
                  <>
                    <span>{criterion.name} ({criterion.weight}%)</span>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditCriterion(criterion)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCriterion(criterion.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Training Scores Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={500} height={300} data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  )
}