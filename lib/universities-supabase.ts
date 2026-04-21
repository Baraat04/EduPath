import { createClient } from '@/lib/supabase/client'
import type { Lang } from './lang-context'

// Multilingual university data structure
export interface UniversityTranslation {
  name: string
  location: string
  description: string
  ranking: string
  tuition: string
  scholarships: string
  highlights: string[]
  admissions: {
    requirements: string[]
    deadline_text: string
  }
}

export interface UniversityData {
  id: string
  image: string
  website: string
  rating: number
  reviews: number
  students: string
  admissions: {
    deadline: string
  }
  translations: Record<Lang, UniversityTranslation>
}

// Database row types
interface DbUniversity {
  id: string
  image: string
  website: string
  rating: number
  reviews: number
  students: string
  admissions_deadline: string
  created_at: string
  updated_at: string
}

interface DbUniversityTranslation {
  id: string
  university_id: string
  lang: Lang
  name: string
  location: string
  description: string
  ranking: string
  tuition: string
  scholarships: string
  highlights: string[]
  admission_requirements: string[]
  admission_deadline_text: string
  created_at: string
  updated_at: string
}

// Convert database rows to UniversityData
function dbToUniversityData(
  uni: DbUniversity,
  translations: DbUniversityTranslation[]
): UniversityData {
  const emptyTranslation: UniversityTranslation = {
    name: '',
    location: '',
    description: '',
    ranking: '',
    tuition: '',
    scholarships: '',
    highlights: [],
    admissions: {
      requirements: [],
      deadline_text: '',
    },
  }

  const translationsMap: Record<Lang, UniversityTranslation> = {
    en: { ...emptyTranslation },
    ru: { ...emptyTranslation },
    kz: { ...emptyTranslation },
  }

  translations.forEach((t) => {
    translationsMap[t.lang] = {
      name: t.name || '',
      location: t.location || '',
      description: t.description || '',
      ranking: t.ranking || '',
      tuition: t.tuition || '',
      scholarships: t.scholarships || '',
      highlights: t.highlights || [],
      admissions: {
        requirements: t.admission_requirements || [],
        deadline_text: t.admission_deadline_text || '',
      },
    }
  })

  return {
    id: uni.id,
    image: uni.image || '',
    website: uni.website || '',
    rating: uni.rating || 4.0,
    reviews: uni.reviews || 0,
    students: uni.students || '',
    admissions: {
      deadline: uni.admissions_deadline || '',
    },
    translations: translationsMap,
  }
}

// Fetch all universities from Supabase
export async function getUniversitiesFromSupabase(): Promise<UniversityData[]> {
  const supabase = createClient()
  
  // Fetch universities
  const { data: universities, error: uniError } = await supabase
    .from('universities')
    .select('*')
    .order('created_at', { ascending: true })

  if (uniError) {
    console.error('Error fetching universities:', uniError)
    return []
  }

  if (!universities || universities.length === 0) {
    return []
  }

  // Fetch all translations
  const { data: translations, error: transError } = await supabase
    .from('university_translations')
    .select('*')

  if (transError) {
    console.error('Error fetching translations:', transError)
    return []
  }

  // Group translations by university_id
  const translationsByUni: Record<string, DbUniversityTranslation[]> = {}
  translations?.forEach((t) => {
    if (!translationsByUni[t.university_id]) {
      translationsByUni[t.university_id] = []
    }
    translationsByUni[t.university_id].push(t as DbUniversityTranslation)
  })

  // Convert to UniversityData
  return universities.map((uni) => 
    dbToUniversityData(uni as DbUniversity, translationsByUni[uni.id] || [])
  )
}

// Save a university to Supabase (create or update)
export async function saveUniversityToSupabase(university: UniversityData): Promise<boolean> {
  const supabase = createClient()

  // Check if university exists
  const { data: existing } = await supabase
    .from('universities')
    .select('id')
    .eq('id', university.id)
    .single()

  if (existing) {
    // Update existing university
    const { error: updateError } = await supabase
      .from('universities')
      .update({
        image: university.image,
        website: university.website,
        rating: university.rating,
        reviews: university.reviews,
        students: university.students,
        admissions_deadline: university.admissions.deadline,
      })
      .eq('id', university.id)

    if (updateError) {
      console.error('Error updating university:', updateError)
      return false
    }
  } else {
    // Insert new university
    const { error: insertError } = await supabase
      .from('universities')
      .insert({
        id: university.id,
        image: university.image,
        website: university.website,
        rating: university.rating,
        reviews: university.reviews,
        students: university.students,
        admissions_deadline: university.admissions.deadline,
      })

    if (insertError) {
      console.error('Error inserting university:', insertError)
      return false
    }
  }

  // Upsert translations for each language
  const langs: Lang[] = ['en', 'ru', 'kz']
  for (const lang of langs) {
    const trans = university.translations[lang]
    
    const { error: transError } = await supabase
      .from('university_translations')
      .upsert({
        university_id: university.id,
        lang,
        name: trans.name,
        location: trans.location,
        description: trans.description,
        ranking: trans.ranking,
        tuition: trans.tuition,
        scholarships: trans.scholarships,
        highlights: trans.highlights,
        admission_requirements: trans.admissions.requirements,
        admission_deadline_text: trans.admissions.deadline_text,
      }, {
        onConflict: 'university_id,lang'
      })

    if (transError) {
      console.error(`Error upserting ${lang} translation:`, transError)
      return false
    }
  }

  return true
}

// Delete a university from Supabase
export async function deleteUniversityFromSupabase(id: string): Promise<boolean> {
  const supabase = createClient()

  // Translations will be deleted automatically due to CASCADE
  const { error } = await supabase
    .from('universities')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting university:', error)
    return false
  }

  return true
}

// Generate new ID
export function generateId(): string {
  return crypto.randomUUID()
}

// Create empty university template
export function createEmptyUniversity(): UniversityData {
  return {
    id: generateId(),
    image: '',
    website: '',
    rating: 4.0,
    reviews: 0,
    students: '',
    admissions: {
      deadline: '',
    },
    translations: {
      en: {
        name: '',
        location: '',
        description: '',
        ranking: '',
        tuition: '',
        scholarships: '',
        highlights: ['', '', '', ''],
        admissions: {
          requirements: ['', '', '', ''],
          deadline_text: '',
        },
      },
      ru: {
        name: '',
        location: '',
        description: '',
        ranking: '',
        tuition: '',
        scholarships: '',
        highlights: ['', '', '', ''],
        admissions: {
          requirements: ['', '', '', ''],
          deadline_text: '',
        },
      },
      kz: {
        name: '',
        location: '',
        description: '',
        ranking: '',
        tuition: '',
        scholarships: '',
        highlights: ['', '', '', ''],
        admissions: {
          requirements: ['', '', '', ''],
          deadline_text: '',
        },
      },
    },
  }
}
