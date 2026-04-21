import { createClient } from '@/lib/supabase/server'
import { initialUniversitiesData } from '@/lib/universities-data'
import { NextResponse } from 'next/server'

export async function POST() {  
  const supabase = await createClient()

  // Check if data already exists
  const { data: existing } = await supabase
    .from('universities')
    .select('id')
    .limit(1)

  if (existing && existing.length > 0) {
    return NextResponse.json({ message: 'Database already seeded', count: existing.length })
  }

  // Seed the universities
  for (const uni of initialUniversitiesData) {
    // Insert university
    const { error: uniError } = await supabase
      .from('universities')
      .insert({
        id: uni.id,
        image: uni.image,
        website: uni.website,
        rating: uni.rating,
        reviews: uni.reviews,
        students: uni.students,
        admissions_deadline: uni.admissions.deadline,
      })

    if (uniError) {
      console.error(`Error inserting university ${uni.id}:`, uniError)
      continue
    }

    // Insert translations
    const langs = ['en', 'ru', 'kz'] as const
    for (const lang of langs) {
      const trans = uni.translations[lang]
      const { error: transError } = await supabase
        .from('university_translations')
        .insert({
          university_id: uni.id,
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
        })

      if (transError) {
        console.error(`Error inserting ${lang} translation for ${uni.id}:`, transError)
      }
    }
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Database seeded successfully',
    count: initialUniversitiesData.length
  })
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Send a POST request to seed the database',
    endpoint: '/api/seed-universities'
  })
}
