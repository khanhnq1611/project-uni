"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function SelfAssessmentPage() {
  const [criteria, setCriteria] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (isDraft: boolean) => {
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('criteria', criteria)
    formData.append('description', description)
    files.forEach(file => formData.append('files', file))

    try {
      const endpoint = isDraft ? '/api/achievements/draft' : '/api/achievements'
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Handle successful submission
      alert(isDraft ? 'Draft saved successfully!' : 'Achievement submitted successfully!')
      resetForm()
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setCriteria('')
    setDescription('')
    setFiles([])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Self-Assessment</h1>

      <div className="space-y-6">
        {/* Criteria Selector */}
        <div>
          <Label htmlFor="criteria">Select Criteria</Label>
          <Select onValueChange={setCriteria} value={criteria}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose assessment criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="teamwork">Teamwork</SelectItem>
              <SelectItem value="innovation">Innovation</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Achievement Description */}
        <div>
          <Label htmlFor="description">Achievement Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 min-h-[150px]"
            placeholder="Describe your achievement in detail..."
          />
        </div>

        {/* File Uploader */}
        <div>
          <Label>Upload Evidence</Label>
          <div className="mt-2">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose Files
            </Label>
            <p className="text-sm text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG (Max size: 5MB each)
            </p>

            {/* Display uploaded files */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting || !criteria || !description}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </div>
      </div>
    </div>
  )
}