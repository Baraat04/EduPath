"use client"

import { useState } from "react"
import { Globe, AtSign, Phone, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  navigation: [
    { label: "About Us" },
    { label: "Privacy Policy" },
    { label: "Contact Support" },
  ],
  resources: [
    { label: "University Partners" },
    { label: "Student Visas" },
    { label: "Scholarship Guide" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail("")
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <footer className="w-full mt-20 bg-slate-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 px-6 md:px-12 py-16 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="text-xl font-black text-white mb-6 font-headline">
            EduPath Kazakhstan
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Empowering global students to access premium education in the heart of Eurasia through digital transparency.
          </p>
          <div className="flex gap-4">
            <button className="text-slate-400 cursor-pointer hover:text-white transition-colors">
              <Globe size={20} />
            </button>
            <button className="text-slate-400 cursor-pointer hover:text-white transition-colors">
              <AtSign size={20} />
            </button>
            <button className="text-slate-400 cursor-pointer hover:text-white transition-colors">
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-500">
            Navigation
          </h4>
          <ul className="space-y-4">
            {footerLinks.navigation.map((link) => (
              <li key={link.label}>
                <span className="text-slate-500 text-sm cursor-default select-none">
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-500">
            Resources
          </h4>
          <ul className="space-y-4">
            {footerLinks.resources.map((link) => (
              <li key={link.label}>
                <span className="text-slate-500 text-sm cursor-default select-none">
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-2 uppercase tracking-widest text-xs text-slate-500">
            Stay Updated
          </h4>
          <p className="text-slate-500 text-xs mb-4">
            Get the latest news about universities and scholarships.
          </p>
          {sent ? (
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-3">
              <CheckCircle size={18} className="text-green-400 shrink-0" />
              <span className="text-green-400 text-sm font-medium">You&apos;re subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 bg-secondary hover:bg-secondary/80 text-white rounded-lg w-10 h-10"
              >
                <Send size={15} />
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="px-6 md:px-12 py-8 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">
          © 2024 EduPath Kazakhstan. The Digital Diplomat initiative.
        </p>
      </div>
    </footer>
  )
}
