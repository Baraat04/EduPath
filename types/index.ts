export interface University {
  id: string
  name: string
  location: string
  country: string
  image: string
  rating: number
  studentsCount: number
  programs: Program[]
  tuitionFee: {
    min: number
    max: number
    currency: string
  }
  established: number
  description: string
}

export interface Program {
  id: string
  name: string
  level: 'Bachelor' | 'Master' | 'PhD' | 'Diploma'
  duration: number
  durationUnit: 'years' | 'months'
  field: string
  tuitionFee: number
  language: string[]
}

export interface Student {
  id: string
  email: string
  name: string
  phone: string
  dateOfBirth: string
  nationality: string
  currentEducation: {
    level: string
    institution: string
    gpa: number
  }
}

export interface Application {
  id: string
  studentId: string
  universityId: string
  programId: string
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
  submittedAt?: Date
  decidedAt?: Date
  documents: Document[]
}

export interface Document {
  id: string
  applicationId: string
  type: 'transcript' | 'certificate' | 'recommendation' | 'essay' | 'visa' | 'other'
  name: string
  url: string
  uploadedAt: Date
}

export interface TestimonialType {
  id: string
  studentName: string
  university: string
  program: string
  text: string
  rating: number
  image?: string
}
