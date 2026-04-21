import { createClient } from '@/lib/supabase/client'

// Submission types
export type SubmissionType = 'contact' | 'application' | 'consultation'
export type SubmissionStatus = 'new' | 'in_progress' | 'completed' | 'rejected'

export interface Submission {
  id: string
  type: SubmissionType
  status: SubmissionStatus
  first_name: string
  last_name: string
  email: string
  phone: string
  university_id: string | null
  university_name: string
  program: string
  message: string
  preferred_contact: 'email' | 'phone' | 'whatsapp'
  source: string
  created_at: string
  updated_at: string
}

export interface CreateSubmissionData {
  type: SubmissionType
  first_name: string
  last_name: string
  email: string
  phone?: string
  university_id?: string
  university_name?: string
  program?: string
  message?: string
  preferred_contact?: 'email' | 'phone' | 'whatsapp'
  source?: string
}

// Fetch all submissions
export async function getSubmissionsFromSupabase(): Promise<Submission[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching submissions:', error)
    return []
  }

  return data as Submission[]
}

// Create a new submission
export async function createSubmission(submission: CreateSubmissionData): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('submissions')
    .insert({
      type: submission.type,
      first_name: submission.first_name,
      last_name: submission.last_name,
      email: submission.email,
      phone: submission.phone || '',
      university_id: submission.university_id || null,
      university_name: submission.university_name || '',
      program: submission.program || '',
      message: submission.message || '',
      preferred_contact: submission.preferred_contact || 'email',
      source: submission.source || 'website',
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error creating submission:', error)
    return { success: false, error: error.message }
  }

  return { success: true, id: data.id }
}

// Update submission status
export async function updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating submission status:', error)
    return false
  }

  return true
}

// Delete a submission
export async function deleteSubmission(id: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting submission:', error)
    return false
  }

  return true
}
