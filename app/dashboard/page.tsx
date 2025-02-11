"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "lucide-react"

export default function StudentDashboard() {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    studentId: "123456",
    className: "CS101",
    email: "john.doe@example.com"
  })
  
  const [trainingPoints, setTrainingPoints] = useState([
    { semester: "Fall 2023", points: 85 },
    { semester: "Spring 2023", points: 90 },
    { semester: "Fall 2022", points: 80 }
  ])
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New assignment posted in CS101" },
    { id: 2, message: "Class meeting rescheduled to Friday" },
    { id: 3, message: "Reminder: Submit your project proposal" }
  ])

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold">{studentInfo.name}</p>
              <p className="text-sm text-gray-600">Student ID: {studentInfo.studentId}</p>
              <p className="text-sm text-gray-600">Class: {studentInfo.className}</p>
              <p className="text-sm text-gray-600">Email: {studentInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Points Table */}
      <Card>
        <CardHeader>
          <CardTitle>Training Points</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPoints.map((point, index) => (
                <TableRow key={index}>
                  <TableCell>{point.semester}</TableCell>
                  <TableCell>{point.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="p-3 border rounded-lg">
                <p className="text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4" >
        <Button className="flex-1" variant="outline" asChild>
            <a href="/dashboard/student/self-assessment">Self-assessment</a>
        </Button>
        <Button className="flex-1" variant="outline" asChild>
          <a href="/dashboard/student/history">View History</a>
        </Button>
      </div>
    </div>
  )
}