"use client"

import { useState, useEffect } from "react"
import {
  LogOut, Eye, Trash2, Search, Filter, Users, Mail, Phone, Clock,
  CheckCircle, AlertCircle, X, ChevronDown, ChevronUp, MessageCircle,
  GraduationCap, FileText, Plus, ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  getSubmissionsFromSupabase, 
  updateSubmissionStatus, 
  deleteSubmission as deleteSubmissionFromDb,
  type Submission as DbSubmission,
  type SubmissionStatus
} from "@/lib/submissions-supabase"
import { createClient } from "@/lib/supabase/client"

// ── Types ─────────────────────────────────────────────────────────────────────

type Stage =
  | "new_inquiry"
  | "consultation_scheduled"
  | "documents_collection"
  | "application_submitted"
  | "awaiting_decision"
  | "admitted"
  | "visa_process"
  | "arrived"

type Note = {
  id: string
  text: string
  createdAt: string
}

type Submission = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message?: string
  companyName?: string
  companyCountry?: string
  companyDescription?: string
  consultationGoal?: string
  country?: string
  submittedAt: string
  status: "new" | "reviewed" | "contacted"
  stage?: Stage
  notes?: Note[]
  wishlistUniversities?: string[]
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STAGES: { value: Stage; label: string; color: string }[] = [
  { value: "new_inquiry",               label: "New Inquiry",               color: "bg-slate-700 text-slate-200" },
  { value: "consultation_scheduled",    label: "Consultation Scheduled",    color: "bg-blue-700 text-blue-100" },
  { value: "documents_collection",      label: "Collecting Documents",      color: "bg-amber-700 text-amber-100" },
  { value: "application_submitted",     label: "Application Submitted",     color: "bg-purple-700 text-purple-100" },
  { value: "awaiting_decision",         label: "Awaiting Decision",         color: "bg-orange-700 text-orange-100" },
  { value: "admitted",                  label: "Admitted",                  color: "bg-green-700 text-green-100" },
  { value: "visa_process",              label: "Visa Process",              color: "bg-cyan-700 text-cyan-100" },
  { value: "arrived",                   label: "Arrived in Kazakhstan",     color: "bg-emerald-700 text-emerald-100" },
]

const STATUS_CONFIG = {
  new:      { label: "New",       color: "bg-blue-900/60 text-blue-300" },
  reviewed: { label: "Reviewed",  color: "bg-amber-900/60 text-amber-300" },
  contacted:{ label: "Contacted", color: "bg-green-900/60 text-green-300" },
}

const SUBJECT_LABELS: Record<string, string> = {
  consultation: "Free Consultation",
  partnership:  "Partnership Inquiry",
  general:      "General Inquiry",
  services:     "About Services",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function stageConfig(s?: Stage) {
  return STAGES.find((x) => x.value === s) ?? STAGES[0]
}

// ── Login ──────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const supabaseClient = createClient()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  // 1. Call Supabase Auth
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: username, // Assuming username field is actually the email
    password: password,
  });

  if (error) {
    setError(error.message); // e.g., "Invalid login credentials"
    return;
  }

  // 2. Check if this specific user is the Admin
  // You can check by ID or Email
  const isAdmin = data.user?.email === "manager@gmail.com";

  if (isAdmin) {
    onLogin(); // Proceed to admin panel
  } else {
    // If they logged in but aren't the admin, log them back out!
    await supabaseClient.auth.signOut();
    setError("You are not authorized to view this page.");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary-foreground font-black text-xl">E</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">EduPath Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Manager access only</p>
        </div>
        <Card className="p-6 bg-slate-900 border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="admin"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary text-sm" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                <AlertCircle size={15} className="shrink-0" />{error}
              </div>
            )}
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground font-semibold py-2.5">Sign In</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

// ── Detail Modal ───────────────────────────────────────────────────────────────

function DetailModal({
  submission, onClose, onStatusChange, onStageChange, onDelete, onAddNote, onDeleteNote,
}: {
  submission: Submission
  onClose: () => void
  onStatusChange: (id: string, status: Submission["status"]) => void
  onStageChange: (id: string, stage: Stage) => void
  onDelete: (id: string) => void
  onAddNote: (id: string, text: string) => void
  onDeleteNote: (submissionId: string, noteId: string) => void
}) {
  const [noteText, setNoteText] = useState("")
  const [stageDropOpen, setStageDropOpen] = useState(false)

  const submitNote = () => {
    if (!noteText.trim()) return
    onAddNote(submission.id, noteText.trim())
    setNoteText("")
  }

  const isPartnership = submission.subject === "partnership"
  const stage = stageConfig(submission.stage)

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div
        className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50 sticky top-0 z-10 rounded-t-2xl">
          <div>
            <h2 className="font-bold text-white text-base">{submission.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{formatDate(submission.submittedAt)}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-6">

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Email</p>
              <a href={`mailto:${submission.email}`} className="text-secondary text-sm hover:underline flex items-center gap-1.5">
                <Mail size={13} />{submission.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Phone</p>
              <div className="flex flex-col gap-0.5">
                <a href={`tel:${submission.phone}`} className="text-white text-sm flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Phone size={13} />{submission.phone || "—"}
                </a>
                {submission.phone && (
                  <a href={`https://wa.me/${submission.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                    className="text-green-500 text-xs flex items-center gap-1 hover:underline">
                    <MessageCircle size={12} />Open in WhatsApp
                  </a>
                )}
              </div>
            </div>
            {submission.country && (
              <div>
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Country</p>
                <p className="text-sm text-white">{submission.country}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Subject</p>
              <p className="text-sm text-white font-medium">{SUBJECT_LABELS[submission.subject] ?? submission.subject}</p>
            </div>
          </div>

          {/* Partnership extra fields */}
          {isPartnership && (
            <div className="bg-slate-800 rounded-xl p-4 space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3">Partnership Details</p>
              {submission.companyName && <p className="text-sm text-white"><span className="text-slate-400">Company: </span>{submission.companyName}</p>}
              {submission.companyCountry && <p className="text-sm text-white"><span className="text-slate-400">Country: </span>{submission.companyCountry}</p>}
              {submission.companyDescription && <p className="text-sm text-white"><span className="text-slate-400">About: </span>{submission.companyDescription}</p>}
              {submission.consultationGoal && <p className="text-sm text-white"><span className="text-slate-400">Goal: </span>{submission.consultationGoal}</p>}
            </div>
          )}

          {/* Message */}
          {submission.message && (
            <div>
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">Message</p>
              <p className="text-sm text-slate-300 bg-slate-800 rounded-xl p-4 leading-relaxed whitespace-pre-wrap">{submission.message}</p>
            </div>
          )}

          {/* Wishlist universities */}
          {submission.wishlistUniversities && submission.wishlistUniversities.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium flex items-center gap-1.5">
                <GraduationCap size={14} />Saved Universities
              </p>
              <div className="flex flex-wrap gap-2">
                {submission.wishlistUniversities.map((name) => (
                  <span key={name} className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full font-medium">{name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Stage / Pipeline */}
          <div>
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium flex items-center gap-1.5">
              <ChevronRight size={14} />Student Stage
            </p>
            <div className="relative">
              <button
                onClick={() => setStageDropOpen((o) => !o)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold ${stage.color} w-full justify-between`}
              >
                {stage.label}
                <ChevronDown size={15} className={`transition-transform ${stageDropOpen ? 'rotate-180' : ''}`} />
              </button>
              {stageDropOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden z-20 shadow-xl">
                  {STAGES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => { onStageChange(submission.id, s.value); setStageDropOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-slate-700 ${
                        submission.stage === s.value ? 'bg-slate-700' : ''
                      } ${s.color}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Visual pipeline strip */}
            <div className="flex gap-1 mt-3 flex-wrap">
              {STAGES.map((s, i) => {
                const currentIdx = STAGES.findIndex((x) => x.value === (submission.stage ?? "new_inquiry"))
                const past = i <= currentIdx
                return (
                  <div key={s.value} title={s.label}
                    className={`h-2 rounded-full flex-1 min-w-[12px] transition-all ${past ? 'bg-secondary' : 'bg-slate-700'}`}
                  />
                )
              })}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">Contact Status</p>
            <div className="flex flex-wrap gap-2">
              {(["new", "reviewed", "contacted"] as Submission["status"][]).map((s) => (
                <button key={s} onClick={() => onStatusChange(submission.id, s)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-colors ${
                    submission.status === s
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "border-slate-700 text-slate-400 hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-medium flex items-center gap-1.5">
              <FileText size={14} />Manager Notes
            </p>
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
              {(submission.notes ?? []).length === 0 ? (
                <p className="text-slate-500 text-xs italic">No notes yet.</p>
              ) : (
                [...(submission.notes ?? [])].reverse().map((note) => (
                  <div key={note.id} className="bg-slate-800 rounded-xl p-3 flex justify-between items-start gap-2 group">
                    <div className="flex-1">
                      <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatDate(note.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => onDeleteNote(submission.id, note.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0 mt-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitNote() } }}
                placeholder="Add a note... (Enter to save)"
                rows={2}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
              <button onClick={submitNote}
                className="bg-secondary text-secondary-foreground p-3 rounded-xl hover:bg-secondary/90 transition-colors shrink-0 self-end">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-5 py-4 border-t border-slate-800 bg-slate-950/30 rounded-b-2xl">
          <button onClick={() => { onDelete(submission.id); onClose() }}
            className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors">
            <Trash2 size={15} />Delete
          </button>
          <Button size="sm" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white">Close</Button>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | Submission["status"]>("all")
  const [filterStage, setFilterStage] = useState<"all" | Stage>("all")
  const [selected, setSelected] = useState<Submission | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  // Load submissions from Supabase
  useEffect(() => {
    async function loadSubmissions() {
      setLoading(true)
      try {
        const data = await getSubmissionsFromSupabase()
        // Convert from DB format to local format
        const formatted: Submission[] = data.map((s) => ({
          id: s.id,
          name: `${s.first_name} ${s.last_name}`.trim(),
          email: s.email,
          phone: s.phone,
          subject: s.type === 'consultation' ? 'consultation' : s.type === 'contact' ? 'general' : 'services',
          message: s.message,
          submittedAt: s.created_at,
          status: s.status === 'new' ? 'new' : s.status === 'in_progress' ? 'reviewed' : 'contacted',
          stage: 'new_inquiry' as Stage,
        }))
        setSubmissions(formatted)
      } catch (error) {
        console.error('Error loading submissions:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSubmissions()
  }, [])

  const handleStatusChange = async (id: string, status: Submission["status"]) => {
    // Map local status to DB status
    const dbStatus: SubmissionStatus = status === 'new' ? 'new' : status === 'reviewed' ? 'in_progress' : 'completed'
    const success = await updateSubmissionStatus(id, dbStatus)
    if (success) {
      const updated = submissions.map((s) => (s.id === id ? { ...s, status } : s))
      setSubmissions(updated)
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : prev)
    }
  }

  const handleStageChange = (id: string, stage: Stage) => {
    // Stages are local-only for now
    const updated = submissions.map((s) => (s.id === id ? { ...s, stage } : s))
    setSubmissions(updated)
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, stage } : prev)
  }

  const handleDelete = async (id: string) => {
    const success = await deleteSubmissionFromDb(id)
    if (success) {
      setSubmissions(submissions.filter((s) => s.id !== id))
      if (selected?.id === id) setSelected(null)
    }
  }

const handleAddNote = (id: string, text: string) => {
  const note: Note = { id: Date.now().toString(), text, createdAt: new Date().toISOString() }
  const updated = submissions.map((s) =>
  s.id === id ? { ...s, notes: [...(s.notes ?? []), note] } : s
  )
  setSubmissions(updated)
  if (selected?.id === id) setSelected((prev) => prev ? { ...prev, notes: [...(prev.notes ?? []), note] } : prev)
  }

  const handleDeleteNote = (submissionId: string, noteId: string) => {
  const updated = submissions.map((s) =>
  s.id === submissionId ? { ...s, notes: (s.notes ?? []).filter((n) => n.id !== noteId) } : s
  )
  setSubmissions(updated)
  if (selected?.id === submissionId)
      setSelected((prev) => prev ? { ...prev, notes: (prev.notes ?? []).filter((n) => n.id !== noteId) } : prev)
  }

  const filtered = submissions
    .filter((s) => {
      const q = search.toLowerCase()
      const matchSearch = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.phone ?? "").includes(q)
      const matchStatus = filterStatus === "all" || s.status === filterStatus
      const matchStage = filterStage === "all" || (s.stage ?? "new_inquiry") === filterStage
      return matchSearch && matchStatus && matchStage
    })
    .sort((a, b) => {
      const diff = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
      return sortDir === "desc" ? -diff : diff
    })

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    reviewed: submissions.filter((s) => s.status === "reviewed").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-secondary-foreground font-black text-sm">E</span>
          </div>
          <span className="font-black text-white tracking-tight">EduPath</span>
          <span className="text-slate-400 text-sm hidden sm:inline">Admin Panel</span>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <LogOut size={16} /><span className="hidden sm:inline">Sign out</span>
        </button>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total",     value: counts.all,      icon: Users,        color: "text-slate-300" },
            { label: "New",       value: counts.new,      icon: AlertCircle,  color: "text-blue-400" },
            { label: "Reviewed",  value: counts.reviewed, icon: Eye,          color: "text-amber-400" },
            { label: "Contacted", value: counts.contacted,icon: CheckCircle,  color: "text-green-400" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-slate-900 border-slate-800 p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">{stat.label}</p>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or phone..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={15} className="text-slate-500 shrink-0" />
            {(["all", "new", "reviewed", "contacted"] as const).map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filterStatus === s ? "bg-secondary text-secondary-foreground" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}{s === "all" ? ` (${counts.all})` : ` (${counts[s]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Stage filter */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-slate-500 text-xs font-medium">Stage:</span>
          <button onClick={() => setFilterStage("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${filterStage === "all" ? "bg-secondary text-secondary-foreground" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
            All
          </button>
          {STAGES.map((s) => (
            <button key={s.value} onClick={() => setFilterStage(s.value)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${filterStage === s.value ? `${s.color}` : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
              {s.label}
            </button>
          ))}
        </div>

{/* Table / Cards */}
  {loading ? (
  <div className="text-center py-24 text-slate-500">
  <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
  <p className="text-lg font-medium">Loading submissions...</p>
  </div>
  ) : filtered.length === 0 ? (
  <div className="text-center py-24 text-slate-500">
  <Users size={40} className="mx-auto mb-4 opacity-30" />
  <p className="text-lg font-medium">No submissions found</p>
  <p className="text-sm mt-1">
  {submissions.length === 0 ? "Submissions from the contact form will appear here." : "Try adjusting your search or filter."}
  </p>
  </div>
  ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-xl overflow-hidden border border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Name</th>
                    <th className="px-5 py-3 text-left font-medium">Contact</th>
                    <th className="px-5 py-3 text-left font-medium">Subject</th>
                    <th className="px-5 py-3 text-left font-medium">Stage</th>
                    <th className="px-5 py-3 text-left font-medium">
                      <button onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
                        className="flex items-center gap-1 hover:text-white transition-colors">
                        Date {sortDir === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
                      </button>
                    </th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                    <th className="px-5 py-3 text-left font-medium">Notes</th>
                    <th className="px-5 py-3 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map((s) => {
                    const sc = stageConfig(s.stage)
                    return (
                      <tr key={s.id} className="bg-slate-950 hover:bg-slate-900 transition-colors">
                        <td className="px-5 py-4 font-medium text-white">{s.name}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-0.5">
                            <a href={`mailto:${s.email}`} className="text-secondary hover:underline text-xs flex items-center gap-1"><Mail size={12} />{s.email}</a>
                            <span className="text-slate-400 text-xs flex items-center gap-1"><Phone size={12} />{s.phone || "—"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-300 text-xs">{SUBJECT_LABELS[s.subject] ?? s.subject}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${sc.color}`}>{sc.label}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-400 text-xs">
                          <div className="flex items-center gap-1"><Clock size={12} />{formatDate(s.submittedAt)}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_CONFIG[s.status].color}`}>
                            {STATUS_CONFIG[s.status].label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-slate-500 text-xs">{(s.notes ?? []).length} note{(s.notes ?? []).length !== 1 ? "s" : ""}</span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => setSelected(s)}
                              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800" title="View details">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => handleDelete(s.id)}
                              className="text-slate-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((s) => {
                const sc = stageConfig(s.stage)
                return (
                  <div key={s.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4 cursor-pointer" onClick={() => setSelected(s)}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-white">{s.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{formatDate(s.submittedAt)}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_CONFIG[s.status].color}`}>
                        {STATUS_CONFIG[s.status].label}
                      </span>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${sc.color} mb-2`}>{sc.label}</span>
                    <div className="flex flex-col gap-0.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><Mail size={12} />{s.email}</span>
                      {s.phone && <span className="flex items-center gap-1.5"><Phone size={12} />{s.phone}</span>}
                    </div>
                    {(s.wishlistUniversities ?? []).length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-secondary">
                        <GraduationCap size={12} />
                        {s.wishlistUniversities!.length} universit{s.wishlistUniversities!.length > 1 ? "ies" : "y"} saved
                      </div>
                    )}
                    {(s.notes ?? []).length > 0 && (
                      <p className="text-xs text-slate-500 mt-1">{(s.notes ?? []).length} note{(s.notes ?? []).length !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>

      {selected && (
        <DetailModal
          submission={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onStageChange={handleStageChange}
          onDelete={handleDelete}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
        />
      )}
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("edupath_admin") === "1") setLoggedIn(true)
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem("edupath_admin", "1")
    setLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("edupath_admin")
    setLoggedIn(false)
  }

  return loggedIn ? <Dashboard onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />
}
