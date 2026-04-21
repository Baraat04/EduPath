'use client'

import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ModalCTA() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 relative editorial-shadow">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold font-headline text-foreground mb-2">
                Get Started Today
              </h2>
              <p className="text-muted-foreground">
                Join thousands of students who have successfully applied to Kazakhstan universities.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <Button className="w-full bg-secondary text-secondary-foreground">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      )}

      <Button
        onClick={() => setOpen(true)}
        className="bg-secondary text-secondary-foreground"
      >
        Get Started
      </Button>
    </>
  )
}
