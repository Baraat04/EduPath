"use client"

import { useState, useEffect } from "react"
import {
  LogOut, Search, Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp,
  AlertCircle, GraduationCap, Star, Users, DollarSign, Globe, CheckCircle,
  Building2, FileText, Calendar, ExternalLink, Image as ImageIcon, Upload, Loader2,
} from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  getUniversitiesFromSupabase,
  saveUniversityToSupabase,
  deleteUniversityFromSupabase,
  createEmptyUniversity,
  type UniversityData,
} from "@/lib/universities-supabase"
import { createClient } from "@/lib/supabase/client"
import type { Lang } from "@/lib/lang-context"

// ── Constants ─────────────────────────────────────────────────────────────────

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "kz", label: "Қазақша", flag: "🇰🇿" },
]

const ADMIN_LABELS = {
  en: {
    title: "Universities Admin",
    subtitle: "Manage all university data across all languages",
    search: "Search universities...",
    addNew: "Add University",
    editUniversity: "Edit University",
    addUniversity: "Add New University",
    save: "Save Changes",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this university?",
    tabs: {
      overview: "Overview",
      admissions: "Admissions",
    },
    fields: {
      name: "University Name",
      location: "Location",
      description: "Description",
      ranking: "Ranking",
      rating: "Rating",
      reviews: "Reviews Count",
      students: "Students Count",
      tuition: "Tuition Range",
      scholarships: "Scholarships Info",
      website: "Website",
      image: "Banner Image",
      uploadImage: "Upload Image",
      pasteUrl: "Or paste image URL",
      removeImage: "Remove image",
      highlights: "Highlights",
      highlightPlaceholder: "Highlight point",
      requirements: "Admission Requirements",
      requirementPlaceholder: "Requirement",
      deadline: "Deadline Date",
      deadlineText: "Deadline Text",
    },
    noResults: "No universities found",
    loginTitle: "Universities Admin",
    loginSubtitle: "Manager access only",
    username: "Username",
    password: "Password",
    signIn: "Sign In",
    invalidCredentials: "Invalid username or password",
    languageHint: "Fill information for each language tab",
  },
}

// ── Login Screen ──────────────────────────────────────────────────────────────

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
  const isAdmin = data.user?.email === "admin@gmail.com";

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
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {ADMIN_LABELS.en.loginTitle}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {ADMIN_LABELS.en.loginSubtitle}
          </p>
        </div>
        <Card className="p-6 bg-slate-900 border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {ADMIN_LABELS.en.username}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {ADMIN_LABELS.en.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5"
            >
              {ADMIN_LABELS.en.signIn}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

// ── University Editor ─────────────────────────────────────────────────────────

function UniversityEditor({
  university,
  isNew,
  onSave,
  onCancel,
  onDelete,
  isSaving,
}: {
  university: UniversityData
  isNew: boolean
  onSave: (data: UniversityData) => void
  onCancel: () => void
  onDelete?: () => void
  isSaving?: boolean
}) {
  const [data, setData] = useState<UniversityData>(university)
  const [activeLang, setActiveLang] = useState<Lang>("en")
  const [activeTab, setActiveTab] = useState<"overview" | "admissions">("overview")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const labels = ADMIN_LABELS.en

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Convert to base64 for localStorage storage (in production, you'd upload to a server)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setData((prev) => ({ ...prev, image: base64String }))
        setIsUploading(false)
      }
      reader.onerror = () => {
        setIsUploading(false)
        alert("Failed to read file")
      }
      reader.readAsDataURL(file)
    } catch {
      setIsUploading(false)
      alert("Failed to upload image")
    }
  }

  const updateTranslation = (
    field: string,
    value: string | string[],
    nestedField?: string
  ) => {
    setData((prev) => {
      const newData = { ...prev }
      if (nestedField) {
        newData.translations[activeLang] = {
          ...newData.translations[activeLang],
          [field]: {
            ...(newData.translations[activeLang][field as keyof typeof newData.translations.en] as Record<string, unknown>),
            [nestedField]: value,
          },
        }
      } else {
        newData.translations[activeLang] = {
          ...newData.translations[activeLang],
          [field]: value,
        }
      }
      return newData
    })
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...data.translations[activeLang].highlights]
    newHighlights[index] = value
    updateTranslation("highlights", newHighlights)
  }

  const addHighlight = () => {
    const newHighlights = [...data.translations[activeLang].highlights, ""]
    updateTranslation("highlights", newHighlights)
  }

  const removeHighlight = (index: number) => {
    const newHighlights = data.translations[activeLang].highlights.filter(
      (_, i) => i !== index
    )
    updateTranslation("highlights", newHighlights)
  }

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...data.translations[activeLang].admissions.requirements]
    newReqs[index] = value
    updateTranslation("admissions", newReqs, "requirements")
  }

  const addRequirement = () => {
    const newReqs = [...data.translations[activeLang].admissions.requirements, ""]
    updateTranslation("admissions", newReqs, "requirements")
  }

  const removeRequirement = (index: number) => {
    const newReqs = data.translations[activeLang].admissions.requirements.filter(
      (_, i) => i !== index
    )
    updateTranslation("admissions", newReqs, "requirements")
  }

  const currentTranslation = data.translations[activeLang]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-slate-700 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <div>
            <h2 className="font-bold text-white text-lg">
              {isNew ? labels.addUniversity : labels.editUniversity}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{labels.languageHint}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 shrink-0">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeLang === lang.code
                  ? "bg-slate-800 text-white border-b-2 border-emerald-500"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>{lang.flag}</span>
              <span className="hidden sm:inline">{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/30 shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "text-emerald-400 border-b-2 border-emerald-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {labels.tabs.overview}
          </button>
          <button
            onClick={() => setActiveTab("admissions")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "admissions"
                ? "text-emerald-400 border-b-2 border-emerald-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {labels.tabs.admissions}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Basic Info - shared across languages */}
              {activeLang === "en" && (
                <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 mb-6">
                  <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} /> Shared Fields (All Languages)
                  </p>
                  {/* Banner Image Upload */}
                  <div className="mb-4">
                    <label className="block text-xs text-slate-400 mb-2">
                      University Banner Image
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image Preview */}
                      <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center shrink-0">
                        {data.image ? (
                          <img
                            src={data.image}
                            alt="University banner"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <ImageIcon size={32} className="text-slate-600 mx-auto mb-2" />
                            <p className="text-xs text-slate-500">No image</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Controls */}
                      <div className="flex-1 space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="w-full px-4 py-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload size={16} />
                              Upload Image
                            </>
                          )}
                        </button>
                        <div className="text-xs text-slate-500">
                          Or paste image URL:
                        </div>
                        <input
                          type="text"
                          value={data.image}
                          onChange={(e) =>
                            setData((prev) => ({ ...prev, image: e.target.value }))
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {data.image && (
                          <button
                            type="button"
                            onClick={() => setData((prev) => ({ ...prev, image: "" }))}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Remove image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        {labels.fields.website}
                      </label>
                      <input
                        type="text"
                        value={data.website}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, website: e.target.value }))
                        }
                        placeholder="university.edu.kz"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        {labels.fields.rating}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={data.rating}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              rating: parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="w-24 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        {labels.fields.reviews}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={data.reviews}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            reviews: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        {labels.fields.students}
                      </label>
                      <input
                        type="text"
                        value={data.students}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, students: e.target.value }))
                        }
                        placeholder="15,000+"
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Language-specific fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      {labels.fields.name}
                    </label>
                    <input
                      type="text"
                      value={currentTranslation.name}
                      onChange={(e) => updateTranslation("name", e.target.value)}
                      placeholder="University Name"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      {labels.fields.location}
                    </label>
                    <input
                      type="text"
                      value={currentTranslation.location}
                      onChange={(e) => updateTranslation("location", e.target.value)}
                      placeholder="Astana, Kazakhstan"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">
                    {labels.fields.description}
                  </label>
                  <textarea
                    value={currentTranslation.description}
                    onChange={(e) => updateTranslation("description", e.target.value)}
                    placeholder="University description..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      {labels.fields.ranking}
                    </label>
                    <input
                      type="text"
                      value={currentTranslation.ranking}
                      onChange={(e) => updateTranslation("ranking", e.target.value)}
                      placeholder="Top 200 Globally"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      {labels.fields.tuition}
                    </label>
                    <input
                      type="text"
                      value={currentTranslation.tuition}
                      onChange={(e) => updateTranslation("tuition", e.target.value)}
                      placeholder="$2,000 – $4,000"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">
                    {labels.fields.scholarships}
                  </label>
                  <input
                    type="text"
                    value={currentTranslation.scholarships}
                    onChange={(e) => updateTranslation("scholarships", e.target.value)}
                    placeholder="40% of students receive scholarships"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Highlights */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs text-slate-400">
                      {labels.fields.highlights}
                    </label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {currentTranslation.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => updateHighlight(index, e.target.value)}
                          placeholder={`${labels.fields.highlightPlaceholder} ${index + 1}`}
                          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "admissions" && (
            <div className="space-y-5">
              {/* Deadline - shared */}
              {activeLang === "en" && (
                <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 mb-4">
                  <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={14} /> Shared Fields
                  </p>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      {labels.fields.deadline}
                    </label>
                    <input
                      type="date"
                      value={data.admissions.deadline}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          admissions: { ...prev.admissions, deadline: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Language-specific */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">
                  {labels.fields.deadlineText}
                </label>
                <input
                  type="text"
                  value={currentTranslation.admissions.deadline_text}
                  onChange={(e) =>
                    updateTranslation("admissions", e.target.value, "deadline_text")
                  }
                  placeholder="May 31, 2025"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-slate-400">
                    {labels.fields.requirements}
                  </label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {currentTranslation.admissions.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder={`${labels.fields.requirementPlaceholder} ${index + 1}`}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-5 py-4 border-t border-slate-800 bg-slate-950/30 shrink-0">
          <div>
            {!isNew && onDelete && (
              <>
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-sm">{labels.confirmDelete}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        onDelete()
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="text-slate-400"
                    >
                      No
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={15} />
                    {labels.delete}
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancel}
              className="text-slate-400 hover:text-white"
            >
              {labels.cancel}
            </Button>
            <Button
              size="sm"
              onClick={() => onSave(data)}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 size={15} className="mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} className="mr-1.5" />
                  {labels.save}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── University Card ───────────────────────────────────────────────────────────

function UniversityCard({
  university,
  onEdit,
}: {
  university: UniversityData
  onEdit: () => void
}) {
  const trans = university.translations.en

  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors group">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-40 h-32 sm:h-auto shrink-0 bg-slate-800 relative overflow-hidden">
          {university.image ? (
            <img
              src={university.image}
              alt={trans.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <ImageIcon size={32} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                {trans.name || "Untitled University"}
              </h3>
              <p className="text-slate-400 text-sm">{trans.location || "No location"}</p>
            </div>
            <button
              onClick={onEdit}
              className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>

          <p className="text-slate-500 text-sm line-clamp-2 mb-3">
            {trans.description || "No description"}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} className="fill-amber-400" />
              <span className="font-medium">{university.rating}</span>
              <span className="text-slate-500">({university.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Users size={12} />
              <span>{university.students || "—"}</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <DollarSign size={12} />
              <span>{trans.tuition || "—"}</span>
            </div>
            {university.website && (
              <a
                href={`https://${university.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
              >
                <ExternalLink size={12} />
                <span>{university.website}</span>
              </a>
            )}
          </div>

          {/* Language indicators */}
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-500 mr-2">Translations:</span>
            {LANGUAGES.map((lang) => {
              const hasContent = university.translations[lang.code]?.name?.trim()
              return (
                <span
                  key={lang.code}
                  className={`text-sm ${hasContent ? "" : "opacity-30"}`}
                  title={hasContent ? `${lang.label}: Complete` : `${lang.label}: Empty`}
                >
                  {lang.flag}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [universities, setUniversities] = useState<UniversityData[]>([])
  const [search, setSearch] = useState("")
  const [editingUniversity, setEditingUniversity] = useState<UniversityData | null>(null)
  const [isNewUniversity, setIsNewUniversity] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const labels = ADMIN_LABELS.en

  // Load universities from Supabase
  const loadUniversities = async () => {
    setIsLoading(true)
    const data = await getUniversitiesFromSupabase()
    setUniversities(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadUniversities()
  }, [])

  const handleSave = async (data: UniversityData) => {
    setIsSaving(true)
    const success = await saveUniversityToSupabase(data)
    if (success) {
      // Reload from Supabase to get fresh data
      await loadUniversities()
      setEditingUniversity(null)
      setIsNewUniversity(false)
    } else {
      alert("Failed to save university. Please try again.")
    }
    setIsSaving(false)
  }

  const handleDelete = async (id: string) => {
    setIsSaving(true)
    const success = await deleteUniversityFromSupabase(id)
    if (success) {
      await loadUniversities()
      setEditingUniversity(null)
    } else {
      alert("Failed to delete university. Please try again.")
    }
    setIsSaving(false)
  }

  const handleAddNew = () => {
    setEditingUniversity(createEmptyUniversity())
    setIsNewUniversity(true)
  }

  const filtered = universities.filter((u) => {
    const q = search.toLowerCase()
    const en = u.translations.en
    const ru = u.translations.ru
    const kz = u.translations.kz
    return (
      en.name.toLowerCase().includes(q) ||
      ru.name.toLowerCase().includes(q) ||
      kz.name.toLowerCase().includes(q) ||
      en.location.toLowerCase().includes(q) ||
      ru.location.toLowerCase().includes(q) ||
      kz.location.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight">
              {labels.title}
            </h1>
            <p className="text-slate-400 text-xs hidden sm:block">{labels.subtitle}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* Main */}
      <main className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.search}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Button
            onClick={handleAddNew}
            className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0"
          >
            <Plus size={16} className="mr-1.5" />
            {labels.addNew}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Building2 className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{universities.length}</p>
                <p className="text-xs text-slate-400">Universities</p>
              </div>
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Star className="text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {universities.length > 0
                    ? (
                        universities.reduce((sum, u) => sum + u.rating, 0) /
                        universities.length
                      ).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs text-slate-400">Avg Rating</p>
              </div>
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs text-slate-400">Languages</p>
              </div>
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FileText className="text-purple-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {universities.reduce((sum, u) => sum + u.reviews, 0)}
                </p>
                <p className="text-xs text-slate-400">Total Reviews</p>
              </div>
            </div>
          </Card>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-sm">Loading universities...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <Building2 className="text-slate-600" size={32} />
            </div>
            <p className="text-slate-400 text-sm">{labels.noResults}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onEdit={() => {
                  setEditingUniversity(university)
                  setIsNewUniversity(false)
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {editingUniversity && (
        <UniversityEditor
          university={editingUniversity}
          isNew={isNewUniversity}
          onSave={handleSave}
          onCancel={() => {
            if (!isSaving) {
              setEditingUniversity(null)
              setIsNewUniversity(false)
            }
          }}
          onDelete={
            isNewUniversity ? undefined : () => handleDelete(editingUniversity.id)
          }
          isSaving={isSaving}
        />
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MainAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem("edupath_main_admin_session")
    if (session === "active") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem("edupath_main_admin_session", "active")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("edupath_main_admin_session")
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}
