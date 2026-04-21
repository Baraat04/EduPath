-- Create universities table for storing university data
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image TEXT DEFAULT '',
  website TEXT DEFAULT '',
  rating DECIMAL(2,1) DEFAULT 4.0,
  reviews INTEGER DEFAULT 0,
  students TEXT DEFAULT '',
  admissions_deadline TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create university_translations table for multilingual content
CREATE TABLE IF NOT EXISTS public.university_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK (lang IN ('en', 'ru', 'kz')),
  name TEXT DEFAULT '',
  location TEXT DEFAULT '',
  description TEXT DEFAULT '',
  ranking TEXT DEFAULT '',
  tuition TEXT DEFAULT '',
  scholarships TEXT DEFAULT '',
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
  admission_requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
  admission_deadline_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(university_id, lang)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_university_translations_university_id ON public.university_translations(university_id);
CREATE INDEX IF NOT EXISTS idx_university_translations_lang ON public.university_translations(lang);

-- Enable Row Level Security
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_translations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view universities)
CREATE POLICY "Allow public read access to universities" 
  ON public.universities FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to translations" 
  ON public.university_translations FOR SELECT 
  USING (true);

-- Create policies for authenticated users to manage universities
-- (In a production app, you'd want more restrictive policies based on roles)
CREATE POLICY "Allow authenticated users to insert universities" 
  ON public.universities FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update universities" 
  ON public.universities FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated users to delete universities" 
  ON public.universities FOR DELETE 
  USING (true);

CREATE POLICY "Allow authenticated users to insert translations" 
  ON public.university_translations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update translations" 
  ON public.university_translations FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated users to delete translations" 
  ON public.university_translations FOR DELETE 
  USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_universities_updated_at ON public.universities;
CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON public.universities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_university_translations_updated_at ON public.university_translations;
CREATE TRIGGER update_university_translations_updated_at
  BEFORE UPDATE ON public.university_translations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
