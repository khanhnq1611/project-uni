"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Star, Check } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { UserProvider } from '@/context/AuthContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}


export default function TrainingScoreLanding() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (accessToken && refreshToken) {
      // Set cookies
      document.cookie = `accessToken=${accessToken}; path=/`
      document.cookie = `refreshToken=${refreshToken}; path=/`
      
      // Redirect to home page
      router.push('/')
    }
  }, [searchParams, router])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter px-4">
              Effectively Manage Your Training Score
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 text-base md:text-xl px-4">
              Track, analyze, and improve your training performance with our comprehensive management system.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-center mb-8">
            Comprehensive Evaluation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4">
            {[
              { icon: Clock, title: "Timeliness", description: "Track punctuality and deadlines" },
              { icon: Star, title: "Quality", description: "Measure work quality and accuracy" },
              { icon: Check, title: "Completion", description: "Monitor task completion rates" },
            ].map((item, index) => (
              <Card key={index} className="w-full">
                <CardContent className="p-4 md:p-6 flex flex-col items-center text-center space-y-3">
                  <item.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reminder Section */}
      <section className="w-full py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Stay on Track with Reminders
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 text-base md:text-xl">
              Never miss an evaluation with our smart reminder system.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            © 2025 TrainingScore. All rights reserved. USTH Coder Club.
          </p>
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}