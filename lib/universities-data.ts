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

// Initial universities data with all translations
export const initialUniversitiesData: UniversityData[] = [
  {
    id: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM8E97O9X2Gyol4_3oZRPRnimqLTactkHIqqniN8XGy4KpCqQsNZ5NI7dGW9beMT4lIsFvx8Pgg48-rWXVo7SFuqnnNrJFel0QqQ_gZRSArI-iS8P6tB-ExKx1aFgEfwf4xn1RL3cdYlo4EiWcG4JT2JCBvY6CMqvJBT0M3VQk5WUwBec5WhhPRjSG3ekDb6xLT6sqJKMJ6PG5HOoUcB6Vtqkrn5I6iMJ9zMjPHPEOX6Staa0HgL2NT2SOWdWKQ0lAHWJa08_f2Cl',
    website: 'nu.edu.kz',
    rating: 4.9,
    reviews: 124,
    students: '15,000+',
    admissions: {
      deadline: '2025-05-31',
    },
    translations: {
      en: {
        name: 'Nazarbayev University',
        location: 'Astana, Kazakhstan',
        description: "Nazarbayev University is Kazakhstan's premier research institution. It offers a fully English-taught curriculum modelled on world-leading universities and has established partnerships with MIT, Duke, and University College London.",
        ranking: 'Top 200 Globally',
        tuition: '$3,500 – $4,500',
        scholarships: '40% of students receive scholarships',
        highlights: [
          'Research-intensive university with global partnerships',
          'International faculty from 60+ countries',
          'Modern campus with state-of-the-art facilities',
          'Strong industry internship programmes',
        ],
        admissions: {
          requirements: [
            'High school diploma with strong GPA (3.5+)',
            'English language proficiency (IELTS 6.5+ or TOEFL 80+)',
            'SAT / ACT scores recommended',
            'Personal statement and recommendation letters',
          ],
          deadline_text: 'May 31, 2025',
        },
      },
      ru: {
        name: 'Назарбаев Университет',
        location: 'Астана, Казахстан',
        description: 'Назарбаев Университет — ведущий исследовательский университет Казахстана. Предлагает обучение полностью на английском языке по модели ведущих мировых университетов, имеет партнёрства с MIT, Duke и University College London.',
        ranking: 'Топ 200 в мире',
        tuition: '$3,500 – $4,500',
        scholarships: '40% студентов получают стипендии',
        highlights: [
          'Исследовательский университет с глобальными партнёрствами',
          'Международный преподавательский состав из 60+ стран',
          'Современный кампус с передовым оборудованием',
          'Сильные программы стажировок в индустрии',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании с высоким GPA (3.5+)',
            'Знание английского языка (IELTS 6.5+ или TOEFL 80+)',
            'Рекомендуются баллы SAT / ACT',
            'Мотивационное письмо и рекомендации',
          ],
          deadline_text: '31 мая 2025',
        },
      },
      kz: {
        name: 'Назарбаев Университеті',
        location: 'Астана, Қазақстан',
        description: 'Назарбаев Университеті — Қазақстанның жетекші зерттеу университеті. Әлемдегі үздік университеттердің моделі бойынша толық ағылшын тілінде оқытуды ұсынады, MIT, Duke және University College London-мен серіктестік орнатқан.',
        ranking: 'Әлемде үздік 200',
        tuition: '$3,500 – $4,500',
        scholarships: 'Студенттердің 40%-ы стипендия алады',
        highlights: [
          'Жаһандық серіктестіктері бар зерттеу университеті',
          '60+ елден халықаралық оқытушылар',
          'Заманауи жабдықталған кампус',
          'Күшті өндірістік тағылымдама бағдарламалары',
        ],
        admissions: {
          requirements: [
            'Жоғары GPA-мен орта білім туралы аттестат (3.5+)',
            'Ағылшын тілін білу (IELTS 6.5+ немесе TOEFL 80+)',
            'SAT / ACT ұпайлары ұсынылады',
            'Мотивациялық хат және ұсынымдар',
          ],
          deadline_text: '2025 жылдың 31 мамыры',
        },
      },
    },
  },
  {
    id: '2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3kASiVhKIXlvLC4kFk33QvPvDxggF-YdN15xtXFeYfudWrFjvDrQk_ABXc7a-16MfSrYqh-OLvsqaxY7EHGq17NpSvH9H-_hddWwDYAnaTMSTug2RMTuower0Awuj7f4F1i5SXNrW2ElNMy6H38pa807tJfvxN0kTv3sW7JMkKi3o2B653FvRomYb_yuJc5pryOMWaG-HQxG_ZmeYrsUxH4ZGG4GZ_vnrgX4zbwJX9QVktaEvLtSXGZmJjHidD1YOkXpSvbI8rxny',
    website: 'astanait.edu.kz',
    rating: 4.8,
    reviews: 76,
    students: '3,000+',
    admissions: {
      deadline: '2025-08-01',
    },
    translations: {
      en: {
        name: 'Astana IT University',
        location: 'Astana, Kazakhstan',
        description: "AITU is Kazakhstan's newest and most innovative IT-focused university, offering cutting-edge programmes in Computer Science, AI, and Cybersecurity, fully in English.",
        ranking: 'Top IT University in Kazakhstan',
        tuition: '$2,000 – $2,800',
        scholarships: '50% of students receive scholarships',
        highlights: [
          'Fully focused on emerging technologies',
          'Industry-integrated curriculum',
          'Modern tech-hub campus',
          'Strong startup and incubator ecosystem',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'English proficiency test',
            'Mathematics aptitude test',
            'Programming skills assessment (for advanced tracks)',
          ],
          deadline_text: 'August 1, 2025',
        },
      },
      ru: {
        name: 'Astana IT University',
        location: 'Астана, Казахстан',
        description: 'AITU — новейший и самый инновационный IT-университет Казахстана, предлагающий передовые программы по Computer Science, ИИ и кибербезопасности полностью на английском языке.',
        ranking: 'Лучший IT-университет Казахстана',
        tuition: '$2,000 – $2,800',
        scholarships: '50% студентов получают стипендии',
        highlights: [
          'Полный фокус на передовых технологиях',
          'Учебная программа интегрирована с индустрией',
          'Современный технологический кампус',
          'Сильная экосистема стартапов и инкубаторов',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Тест на знание английского языка',
            'Тест по математике',
            'Оценка навыков программирования (для продвинутых треков)',
          ],
          deadline_text: '1 августа 2025',
        },
      },
      kz: {
        name: 'Astana IT University',
        location: 'Астана, Қазақстан',
        description: 'AITU — Қазақстанның ең жаңа және инновациялық IT-университеті, Computer Science, AI және киберқауіпсіздік бойынша ең заманауи бағдарламаларды толық ағылшын тілінде ұсынады.',
        ranking: 'Қазақстандағы үздік IT университеті',
        tuition: '$2,000 – $2,800',
        scholarships: 'Студенттердің 50%-ы стипендия алады',
        highlights: [
          'Жаңа технологияларға толық бағытталған',
          'Өнеркәсіппен интеграцияланған оқу бағдарламасы',
          'Заманауи технологиялық кампус',
          'Күшті стартап және инкубатор экожүйесі',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Ағылшын тілін білу тесті',
            'Математика тесті',
            'Бағдарламалау дағдыларын бағалау (алдыңғы қатарлы бағыттар үшін)',
          ],
          deadline_text: '2025 жылдың 1 тамызы',
        },
      },
    },
  },
  {
    id: '3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJmRDbt_xIen3VY2y3ZE9a6K1K_A5dLE3ojTYWetpCgre9c8HCrKZqGrHk-KVP0Lt49ePOaKXCWQJw4fxg_OzC7X_dcC4K5eP_XEflpV7Wp3D8ovKPlboiUFF4gQlptWnjgxKP0DO2Mpckrp4QARJyyuFspC1EJXChtIud-GOnOfKFgJseQ4bgOeu2NajWLihEthcXbP5oPGL1lJLal_bgfOyglrod6R4G4ZFD1Cr-fJVgG7smppmMalszLzEHPpXSufNqhAizv-sD',
    website: 'kbtu.kz',
    rating: 4.6,
    reviews: 89,
    students: '8,000+',
    admissions: {
      deadline: '2025-06-30',
    },
    translations: {
      en: {
        name: 'Kazakh-British Technical University',
        location: 'Astana, Kazakhstan',
        description: 'KBTU delivers British-standard technical education with a UK partnership for dual-degree opportunities. Its graduates are highly sought by energy, finance, and tech companies across Central Asia.',
        ranking: 'Top Engineering University in Kazakhstan',
        tuition: '$2,800 – $3,200',
        scholarships: '30% of students receive scholarships',
        highlights: [
          'UK partnership for dual-degree programmes',
          'Strong IT and energy industry connections',
          'Modern labs and innovation centres',
          'Active startup incubator on campus',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'English proficiency (IELTS 5.5+ or equivalent)',
            'Mathematics proficiency test',
            'Interview for selected programmes',
          ],
          deadline_text: 'June 30, 2025',
        },
      },
      ru: {
        name: 'Казахстанско-Британский Технический Университет',
        location: 'Астана, Казахстан',
        description: 'КБТУ предлагает техническое образование британского стандарта с возможностью получения двойного диплома. Выпускники высоко востребованы в энергетических, финансовых и технологических компаниях Центральной Азии.',
        ranking: 'Лучший инженерный университет Казахстана',
        tuition: '$2,800 – $3,200',
        scholarships: '30% студентов получают стипендии',
        highlights: [
          'Партнёрство с Великобританией для двойных дипломов',
          'Сильные связи с IT и энергетической индустрией',
          'Современные лаборатории и инновационные центры',
          'Активный стартап-инкубатор на кампусе',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Знание английского языка (IELTS 5.5+ или эквивалент)',
            'Тест по математике',
            'Собеседование для отдельных программ',
          ],
          deadline_text: '30 июня 2025',
        },
      },
      kz: {
        name: 'Қазақстан-Британ Техникалық Университеті',
        location: 'Астана, Қазақстан',
        description: 'ҚБТУ британдық стандарттағы техникалық білім береді, қос диплом алу мүмкіндігімен. Түлектері Орталық Азиядағы энергетика, қаржы және технология компанияларында жоғары сұранысқа ие.',
        ranking: 'Қазақстандағы үздік инженерлік университет',
        tuition: '$2,800 – $3,200',
        scholarships: 'Студенттердің 30%-ы стипендия алады',
        highlights: [
          'Қос диплом бағдарламалары үшін Ұлыбританиямен серіктестік',
          'IT және энергетика саласымен күшті байланыстар',
          'Заманауи зертханалар және инновациялық орталықтар',
          'Кампуста белсенді стартап-инкубатор',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Ағылшын тілін білу (IELTS 5.5+ немесе баламасы)',
            'Математика тесті',
            'Таңдалған бағдарламалар үшін сұхбат',
          ],
          deadline_text: '2025 жылдың 30 маусымы',
        },
      },
    },
  },
  {
    id: '4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM8E97O9X2Gyol4_3oZRPRnimqLTactkHIqqniN8XGy4KpCqQsNZ5NI7dGW9beMT4lIsFvx8Pgg48-rWXVo7SFuqnnNrJFel0QqQ_gZRSArI-iS8P6tB-ExKx1aFgEfwf4xn1RL3cdYlo4EiWcG4JT2JCBvY6CMqvJBT0M3VQk5WUwBec5WhhPRjSG3ekDb6xLT6sqJKMJ6PG5HOoUcB6Vtqkrn5I6iMJ9zMjPHPEOX6Staa0HgL2NT2SOWdWKQ0lAHWJa08_f2Cl',
    website: 'enu.kz',
    rating: 4.5,
    reviews: 143,
    students: '22,000+',
    admissions: {
      deadline: '2025-07-31',
    },
    translations: {
      en: {
        name: 'L.N. Gumilyov Eurasian National University',
        location: 'Astana, Kazakhstan',
        description: 'ENU is one of the largest and most comprehensive universities in Kazakhstan, covering law, economics, humanities, and natural sciences with affordable tuition.',
        ranking: 'Top National University in Kazakhstan',
        tuition: '$1,500 – $2,000',
        scholarships: '45% of students receive scholarships',
        highlights: [
          'Wide range of disciplines across faculties',
          'Strong government and legal sector alumni network',
          'Active international exchange programmes',
          'Affordable tuition for all budgets',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'Language proficiency (Russian / Kazakh or English)',
            'UNT scores or entrance exam',
            'Application documents',
          ],
          deadline_text: 'July 31, 2025',
        },
      },
      ru: {
        name: 'Евразийский национальный университет им. Л.Н. Гумилёва',
        location: 'Астана, Казахстан',
        description: 'ЕНУ — один из крупнейших и наиболее комплексных университетов Казахстана, охватывающий право, экономику, гуманитарные и естественные науки с доступной стоимостью обучения.',
        ranking: 'Лучший национальный университет Казахстана',
        tuition: '$1,500 – $2,000',
        scholarships: '45% студентов получают стипендии',
        highlights: [
          'Широкий спектр дисциплин на всех факультетах',
          'Сильная сеть выпускников в госсекторе и юриспруденции',
          'Активные программы международного обмена',
          'Доступная стоимость обучения для любого бюджета',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Знание языка (русский / казахский или английский)',
            'Баллы ЕНТ или вступительный экзамен',
            'Документы для поступления',
          ],
          deadline_text: '31 июля 2025',
        },
      },
      kz: {
        name: 'Л.Н. Гумилёв атындағы Еуразия ұлттық университеті',
        location: 'Астана, Қазақстан',
        description: 'ЕҰУ — Қазақстандағы ең ірі және кешенді университеттердің бірі, құқық, экономика, гуманитарлық және жаратылыстану ғылымдарын қолжетімді бағамен қамтиды.',
        ranking: 'Қазақстандағы үздік ұлттық университет',
        tuition: '$1,500 – $2,000',
        scholarships: 'Студенттердің 45%-ы стипендия алады',
        highlights: [
          'Барлық факультеттерде кең пәндер ауқымы',
          'Мемлекеттік сектор мен заңгерліктегі күшті түлектер желісі',
          'Белсенді халықаралық алмасу бағдарламалары',
          'Кез келген бюджетке қолжетімді оқу ақысы',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Тіл білімі (қазақ / орыс немесе ағылшын)',
            'ҰБТ ұпайлары немесе қабылдау емтиханы',
            'Түсу құжаттары',
          ],
          deadline_text: '2025 жылдың 31 шілдесі',
        },
      },
    },
  },
  {
    id: '5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgJ_BAuRWUcoV0ux8kTEFs4Keye-1g8gY1LlJhtgbS-fBjYhQVPJJGzSDXT1rWEcYAOvaQPseb_1JyQPf-UyiOFq0j02SSunWNHmHIs0iHvF17OIonNJpK5DM5jstxlh-UvDoHZ5g8KGxh-eGNKLo7jd-90h4GUg5SYEsX7GhQr63Y8Dnztr16_bgt_h-IC_PK4z2vzLr5JZvOWCla7KIe4zS0nfaO5hqOy-z_qvSTlc-s7ueZa8OI4csHjp64tNZ85a_yv3xDFfjg',
    website: 'satbayev.university',
    rating: 4.6,
    reviews: 110,
    students: '20,000+',
    admissions: {
      deadline: '2025-07-15',
    },
    translations: {
      en: {
        name: 'Satbayev University',
        location: 'Astana, Kazakhstan',
        description: "Satbayev University is Kazakhstan's oldest technical university with nearly a century of engineering excellence. Particularly strong in energy, mining, and infrastructure engineering.",
        ranking: 'Top Technical University in Kazakhstan',
        tuition: '$2,000 – $2,500',
        scholarships: '40% of students receive scholarships',
        highlights: [
          'Nearly 90 years of engineering heritage',
          'Strong industry and government contracts',
          'Modern engineering and geoscience labs',
          'Broad range of technical specialisations',
        ],
        admissions: {
          requirements: [
            'High school diploma with math/science focus',
            'Language proficiency',
            'Technical aptitude test',
            'Portfolio for architecture track',
          ],
          deadline_text: 'July 15, 2025',
        },
      },
      ru: {
        name: 'Университет Сатпаева',
        location: 'Астана, Казахстан',
        description: 'Университет Сатпаева — старейший технический университет Казахстана с почти вековой историей инженерного совершенства. Особенно силён в энергетике, горном деле и инфраструктурном строительстве.',
        ranking: 'Лучший технический университет Казахстана',
        tuition: '$2,000 – $2,500',
        scholarships: '40% студентов получают стипендии',
        highlights: [
          'Почти 90 лет инженерного наследия',
          'Крепкие связи с индустрией и государством',
          'Современные инженерные и геологические лаборатории',
          'Широкий спектр технических специализаций',
        ],
        admissions: {
          requirements: [
            'Аттестат с акцентом на математику/науки',
            'Знание языка',
            'Технический тест способностей',
            'Портфолио для архитектурного направления',
          ],
          deadline_text: '15 июля 2025',
        },
      },
      kz: {
        name: 'Сәтбаев Университеті',
        location: 'Астана, Қазақстан',
        description: 'Сәтбаев Университеті — Қазақстанның ең көне техникалық университеті, инженерлік шеберліктің ғасырлық тарихымен. Әсіресе энергетика, тау-кен ісі және инфрақұрылымдық инженерия саласында күшті.',
        ranking: 'Қазақстандағы үздік техникалық университет',
        tuition: '$2,000 – $2,500',
        scholarships: 'Студенттердің 40%-ы стипендия алады',
        highlights: [
          '90 жылға жуық инженерлік мұра',
          'Өнеркәсіп пен мемлекетпен тығыз байланыстар',
          'Заманауи инженерлік және геология зертханалары',
          'Техникалық мамандықтардың кең ауқымы',
        ],
        admissions: {
          requirements: [
            'Математика/ғылымға бағытталған аттестат',
            'Тіл білімі',
            'Техникалық қабілеттер тесті',
            'Сәулет бағыты үшін портфолио',
          ],
          deadline_text: '2025 жылдың 15 шілдесі',
        },
      },
    },
  },
  {
    id: '6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBue7lhmV4tZYVOkM277XeHg08mVCSZ3euqZVDrR3HCVhWdAc_GMirPQmiRvfLU2XspWB5DJihf1sUKmxhk8S8YCbIsG67LFJg0uYYp21K8Tku2NU9-77gpcBeJOsa6YxHiDU9zS2nKdIeQpaR5limbRe7hZr9xFMc6ug4pZ-Qq5FArakeKpBYgdmWURYYhVhbdYP-FgHEbrZ3VJKQ0vy2HS-FvLFS6du-VXk6Kj_RfpwxcDbzHhLfoGIF3eLqZQB2CkoA1zQJExlEu',
    website: 'kaznu.kz',
    rating: 4.7,
    reviews: 156,
    students: '25,000+',
    admissions: {
      deadline: '2025-07-31',
    },
    translations: {
      en: {
        name: 'Al-Farabi Kazakh National University',
        location: 'Almaty, Kazakhstan',
        description: "Al-Farabi KazNU is Kazakhstan's flagship classical university with over 90 years of academic tradition. It is the largest research university in the country, strong across sciences, law, humanities, and international relations.",
        ranking: 'Top 250 Globally',
        tuition: '$1,500 – $2,200',
        scholarships: '45% of students receive scholarships',
        highlights: [
          '90+ years of academic tradition',
          'Comprehensive faculties across all disciplines',
          'Large and active international student community',
          'Most affordable tuition among top universities',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'Language proficiency (Russian / Kazakh or English)',
            'Entrance exam or UNT scores',
            'Application documents',
          ],
          deadline_text: 'July 31, 2025',
        },
      },
      ru: {
        name: 'Казахский национальный университет им. аль-Фараби',
        location: 'Алматы, Казахстан',
        description: 'КазНУ им. аль-Фараби — флагманский классический университет Казахстана с более чем 90-летней академической традицией. Крупнейший исследовательский университет страны, сильный в науках, праве, гуманитарных науках и международных отношениях.',
        ranking: 'Топ 250 в мире',
        tuition: '$1,500 – $2,200',
        scholarships: '45% студентов получают стипендии',
        highlights: [
          'Более 90 лет академических традиций',
          'Комплексные факультеты по всем дисциплинам',
          'Большое и активное международное студенческое сообщество',
          'Самая доступная стоимость среди топовых университетов',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Знание языка (русский / казахский или английский)',
            'Вступительный экзамен или баллы ЕНТ',
            'Документы для поступления',
          ],
          deadline_text: '31 июля 2025',
        },
      },
      kz: {
        name: 'Әл-Фараби атындағы Қазақ ұлттық университеті',
        location: 'Алматы, Қазақстан',
        description: 'Әл-Фараби атындағы ҚазҰУ — 90 жылдан астам академиялық дәстүрі бар Қазақстанның жетекші классикалық университеті. Елдегі ең ірі зерттеу университеті, ғылым, құқық, гуманитарлық ғылымдар мен халықаралық қатынастарда күшті.',
        ranking: 'Әлемде үздік 250',
        tuition: '$1,500 – $2,200',
        scholarships: 'Студенттердің 45%-ы стипендия алады',
        highlights: [
          '90+ жылдық академиялық дәстүр',
          'Барлық пәндер бойынша кешенді факультеттер',
          'Үлкен және белсенді халықаралық студенттер қауымдастығы',
          'Үздік университеттер арасында ең қолжетімді баға',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Тіл білімі (қазақ / орыс немесе ағылшын)',
            'Қабылдау емтиханы немесе ҰБТ ұпайлары',
            'Түсу құжаттары',
          ],
          deadline_text: '2025 жылдың 31 шілдесі',
        },
      },
    },
  },
  {
    id: '7',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl0IqFTI9eFIwvCgui3rH1f8Zm7r1sFmxMvTFH3rU8odAa6rJE22mXRbNvIN-JcdV1PR4Q8gizHxZ6_bESxkhD8yrUanIN6XFsv1bigVJMVPi5aq7Krd0Es-w1m15KVlITnlZ-I5hlX1GzXSfssmoLA0YYNCMxfzmy7QtaCj4RznFfpaXpq0EZOfUibG_niDzmGJV64jij_kRFoRf8Y_JLLGqsP2ZZDSPTFGRqzjWfMZYiKYk7yGgdRvz20FbMP0zsIVv0X7xePElp',
    website: 'kimep.kz',
    rating: 4.8,
    reviews: 112,
    students: '5,000+',
    admissions: {
      deadline: '2025-07-15',
    },
    translations: {
      en: {
        name: 'KIMEP University',
        location: 'Almaty, Kazakhstan',
        description: "KIMEP is Central Asia's premier business and law school, following the North American educational model and holding AACSB accreditation. Programmes are taught fully in English.",
        ranking: 'Top 500 Globally',
        tuition: '$3,500 – $4,000',
        scholarships: '35% of students receive scholarships',
        highlights: [
          'AACSB-accredited business programmes',
          'North American educational model',
          'Strong corporate recruitment network',
          'International exchange opportunities across 40+ countries',
        ],
        admissions: {
          requirements: [
            'High school diploma with good academic standing',
            'English proficiency (IELTS 6.0+ or TOEFL 70+)',
            'Essay and motivation letter',
            'Interview with admissions committee',
          ],
          deadline_text: 'July 15, 2025',
        },
      },
      ru: {
        name: 'Университет КИМЭП',
        location: 'Алматы, Казахстан',
        description: 'КИМЭП — ведущая бизнес- и юридическая школа Центральной Азии, работающая по североамериканской образовательной модели с аккредитацией AACSB. Программы полностью на английском языке.',
        ranking: 'Топ 500 в мире',
        tuition: '$3,500 – $4,000',
        scholarships: '35% студентов получают стипендии',
        highlights: [
          'Бизнес-программы с аккредитацией AACSB',
          'Североамериканская образовательная модель',
          'Сильная сеть корпоративного рекрутинга',
          'Международный обмен с 40+ странами',
        ],
        admissions: {
          requirements: [
            'Аттестат с хорошей успеваемостью',
            'Знание английского (IELTS 6.0+ или TOEFL 70+)',
            'Эссе и мотивационное письмо',
            'Собеседование с приёмной комиссией',
          ],
          deadline_text: '15 июля 2025',
        },
      },
      kz: {
        name: 'КИМЭП Университеті',
        location: 'Алматы, Қазақстан',
        description: 'КИМЭП — Солтүстік Америка білім беру моделі бойынша жұмыс істейтін, AACSB аккредитациясы бар Орталық Азияның жетекші бизнес және заң мектебі. Бағдарламалар толық ағылшын тілінде.',
        ranking: 'Әлемде үздік 500',
        tuition: '$3,500 – $4,000',
        scholarships: 'Студенттердің 35%-ы стипендия алады',
        highlights: [
          'AACSB аккредитациясы бар бизнес бағдарламалары',
          'Солтүстік Америка білім беру моделі',
          'Күшті корпоративтік рекрутинг желісі',
          '40+ елмен халықаралық алмасу мүмкіндіктері',
        ],
        admissions: {
          requirements: [
            'Жақсы үлгерімі бар аттестат',
            'Ағылшын тілін білу (IELTS 6.0+ немесе TOEFL 70+)',
            'Эссе және мотивациялық хат',
            'Қабылдау комиссиясымен сұхбат',
          ],
          deadline_text: '2025 жылдың 15 шілдесі',
        },
      },
    },
  },
  {
    id: '8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGRQom0FaUiA1M6lylYmi8T-HkdQatugpYguhKVCHoDq3eUxSerw3jtJahc77RRE2kEZ61Is3sMdPNxV9_iruPmtrMyFpy5w3UqFF659SDivxm9DavMPyC03Wh86ZnTc90toofH-GM9hciYRV_orUTKKwPLFO2NORpBVPHqIXvBVc2K4A5A0Aik-8yeI58Ky6zSWUdBZa4wwCQEzp5unKyU9QAsSnU4YLckvPBu7OwYBIq9E1nuBmnHpjRhUk2M3x7WySYMO_MhNl3',
    website: 'almau.edu.kz',
    rating: 4.5,
    reviews: 91,
    students: '6,500+',
    admissions: {
      deadline: '2025-08-01',
    },
    translations: {
      en: {
        name: 'Almaty Management University',
        location: 'Almaty, Kazakhstan',
        description: "AlmaU is Almaty's dedicated management and business university, offering practical business education with a strong entrepreneurship culture and regional corporate network.",
        ranking: 'Top Business School in Almaty',
        tuition: '$2,000 – $2,500',
        scholarships: '30% of students receive scholarships',
        highlights: [
          'Strong focus on practical business education',
          'Active alumni network in Kazakh corporate sector',
          'Entrepreneurship and startup culture',
          'English-medium programmes available',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'English or Russian proficiency',
            'Essay / motivation letter',
            'Interview for MBA track',
          ],
          deadline_text: 'August 1, 2025',
        },
      },
      ru: {
        name: 'Алматы Менеджмент Университет',
        location: 'Алматы, Казахстан',
        description: 'AlmaU — специализированный университет менеджмента и бизнеса Алматы, предлагающий практическое бизнес-образование с сильной культурой предпринимательства и региональной корпоративной сетью.',
        ranking: 'Лучшая бизнес-школа Алматы',
        tuition: '$2,000 – $2,500',
        scholarships: '30% студентов получают стипендии',
        highlights: [
          'Сильный акцент на практическом бизнес-образовании',
          'Активная сеть выпускников в казахстанском корпоративном секторе',
          'Культура предпринимательства и стартапов',
          'Программы на английском языке',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Знание английского или русского языка',
            'Эссе / мотивационное письмо',
            'Собеседование для MBA-трека',
          ],
          deadline_text: '1 августа 2025',
        },
      },
      kz: {
        name: 'Алматы Менеджмент Университеті',
        location: 'Алматы, Қазақстан',
        description: 'AlmaU — Алматының мамандандырылған менеджмент және бизнес университеті, күшті кәсіпкерлік мәдениеті мен аймақтық корпоративтік желісі бар практикалық бизнес білім береді.',
        ranking: 'Алматыдағы үздік бизнес мектеп',
        tuition: '$2,000 – $2,500',
        scholarships: 'Студенттердің 30%-ы стипендия алады',
        highlights: [
          'Практикалық бизнес білімге күшті назар',
          'Қазақстан корпоративтік секторындағы белсенді түлектер желісі',
          'Кәсіпкерлік және стартап мәдениеті',
          'Ағылшын тілінде бағдарламалар',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Ағылшын немесе орыс тілін білу',
            'Эссе / мотивациялық хат',
            'MBA-трек үшін сұхбат',
          ],
          deadline_text: '2025 жылдың 1 тамызы',
        },
      },
    },
  },
  {
    id: '9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWOmjeiLkLiS03ASEtRucV-7DxggCWNbLsT7nr2Y9YyfDkVNvvGqrlkmd5ZZbirJVZjWZrryPfchUR9tPALSJcouwhXbmqyHTvdNOD-Oaj-54IeCAEPCj-TK00LbagbWYQSYnQj1Ka5AxcYkzQUAnqqNRUbl_QwMxDi7YxC1tsZpX4M1n0oKQlf9FWnLBcqT65wDKFPEupSO8y1QoaAdyf9Bl6aAl0aNLbHBEyCPqYFxxWj05s2-oaHp9-SBhshUC1fwvaDhXZY8Zk',
    website: 'alatau.edu.kz',
    rating: 4.4,
    reviews: 48,
    students: '2,500+',
    admissions: {
      deadline: '2025-08-15',
    },
    translations: {
      en: {
        name: 'Alatau IT University',
        location: 'Almaty, Kazakhstan',
        description: "Alatau IT University is one of Almaty's newest technology-focused institutions, offering specialised programmes in Cybersecurity, AI, and Software Engineering with a practical, industry-first approach.",
        ranking: 'Emerging IT University in Almaty',
        tuition: '$2,000 – $2,400',
        scholarships: '40% of students receive scholarships',
        highlights: [
          'Specialised technology-only curriculum',
          'Industry-led course design',
          'Small cohorts for hands-on learning',
          'Strong graduate placement in tech sector',
        ],
        admissions: {
          requirements: [
            'High school diploma',
            'English proficiency',
            'Mathematics test',
            'Programming portfolio (optional)',
          ],
          deadline_text: 'August 15, 2025',
        },
      },
      ru: {
        name: 'Alatau IT University',
        location: 'Алматы, Казахстан',
        description: 'Alatau IT University — один из новейших технологических вузов Алматы, предлагающий специализированные программы по кибербезопасности, ИИ и программной инженерии с практическим, ориентированным на индустрию подходом.',
        ranking: 'Перспективный IT-университет Алматы',
        tuition: '$2,000 – $2,400',
        scholarships: '40% студентов получают стипендии',
        highlights: [
          'Специализированная технологическая программа',
          'Курсы разработаны при участии индустрии',
          'Небольшие группы для практического обучения',
          'Сильное трудоустройство выпускников в tech-секторе',
        ],
        admissions: {
          requirements: [
            'Аттестат о среднем образовании',
            'Знание английского языка',
            'Тест по математике',
            'Портфолио по программированию (опционально)',
          ],
          deadline_text: '15 августа 2025',
        },
      },
      kz: {
        name: 'Alatau IT University',
        location: 'Алматы, Қазақстан',
        description: 'Alatau IT University — Алматының ең жаңа технологиялық университеттерінің бірі, киберқауіпсіздік, AI және бағдарламалық инженерия бойынша практикалық, өнеркәсіпке бағытталған мамандандырылған бағдарламаларды ұсынады.',
        ranking: 'Алматыдағы перспективалық IT университеті',
        tuition: '$2,000 – $2,400',
        scholarships: 'Студенттердің 40%-ы стипендия алады',
        highlights: [
          'Тек технологияға мамандандырылған бағдарлама',
          'Өнеркәсіп басшылығымен құрастырылған курстар',
          'Практикалық оқыту үшін шағын топтар',
          'Tech секторында түлектерді күшті орналастыру',
        ],
        admissions: {
          requirements: [
            'Орта білім туралы аттестат',
            'Ағылшын тілін білу',
            'Математика тесті',
            'Бағдарламалау портфолиосы (міндетті емес)',
          ],
          deadline_text: '2025 жылдың 15 тамызы',
        },
      },
    },
  },
]

// Local storage key
const STORAGE_KEY = 'edupath_universities'

// Get universities from localStorage or use initial data
export function getUniversities(): UniversityData[] {
  if (typeof window === 'undefined') return initialUniversitiesData
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return initialUniversitiesData
    }
  }
  return initialUniversitiesData
}

// Save universities to localStorage
export function saveUniversities(universities: UniversityData[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(universities))
}

// Generate new ID
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
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
