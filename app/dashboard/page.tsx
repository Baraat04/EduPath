'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Settings, LogOut } from 'lucide-react'

interface Application {
  id: string
  university: string
  program: string
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected'
  submittedDate: string
  deadline: string
  documents: number
}

const mockApplications: Application[] = [
  {
    id: '1',
    university: 'Nazarbayev University',
    program: 'Computer Science',
    status: 'under-review',
    submittedDate: '2024-03-15',
    deadline: '2024-06-30',
    documents: 5,
  },
  {
    id: '2',
    university: 'Al-Farabi National University',
    program: 'Business Administration',
    status: 'accepted',
    submittedDate: '2024-02-20',
    deadline: '2024-05-15',
    documents: 4,
  },
  {
    id: '3',
    university: 'Kazakh National University',
    program: 'International Relations',
    status: 'submitted',
    submittedDate: '2024-03-10',
    deadline: '2024-07-01',
    documents: 6,
  },
]

function getStatusIcon(status: Application['status']) {
  switch (status) {
    case 'accepted':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'rejected':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    case 'under-review':
      return <Clock className="w-5 h-5 text-blue-600" />
    default:
      return <FileText className="w-5 h-5 text-gray-600" />
  }
}

function getStatusLabel(status: Application['status']) {
  const labels = {
    submitted: 'Submitted',
    'under-review': 'Under Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
  }
  return labels[status]
}

function getStatusColor(status: Application['status']) {
  const colors = {
    submitted: 'bg-gray-100 text-gray-900',
    'under-review': 'bg-blue-100 text-blue-900',
    accepted: 'bg-green-100 text-green-900',
    rejected: 'bg-red-100 text-red-900',
  }
  return colors[status]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'settings'>('applications')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline text-foreground mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">Manage your applications and track your progress</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Applications</div>
              <div className="text-3xl font-bold text-foreground">{mockApplications.length}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Under Review</div>
              <div className="text-3xl font-bold text-blue-600">
                {mockApplications.filter(a => a.status === 'under-review').length}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Accepted</div>
              <div className="text-3xl font-bold text-green-600">
                {mockApplications.filter(a => a.status === 'accepted').length}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
              <div className="text-3xl font-bold text-secondary">67%</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            {(['applications', 'messages', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'applications' && 'Applications'}
                {tab === 'messages' && 'Messages'}
                {tab === 'settings' && 'Settings'}
              </button>
            ))}
          </div>

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {mockApplications.map((app) => (
                <Card key={app.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{app.university}</h3>
                      <p className="text-muted-foreground text-sm">{app.program}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      <Badge className={getStatusColor(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Submitted</span>
                      <p className="font-medium text-foreground">{app.submittedDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deadline</span>
                      <p className="font-medium text-foreground">{app.deadline}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Documents</span>
                      <p className="font-medium text-foreground">{app.documents} uploaded</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Application
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact University
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <Card className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Messages Yet</h3>
                <p className="text-muted-foreground">You&apos;ll receive updates from universities here</p>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4 max-w-2xl">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+7 (700) 123-45-67"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>
                  <Button className="w-full bg-secondary text-secondary-foreground">Save Changes</Button>
                </div>
              </Card>

              <Card className="p-6 border-red-200">
                <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                <Button variant="outline" className="w-full text-red-600 border-red-200">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
