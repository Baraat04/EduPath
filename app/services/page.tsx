'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/fade-in'
import { useLang } from '@/lib/lang-context'

const problemsData = {
  en: [
    {
      problem: "You don't know which university accepts you or fits your goals.",
      solution: "We analyse your profile and match you to the right university from our verified partner network — no guesswork, no wasted applications.",
    },
    {
      problem: "The paperwork is endless and in a foreign language.",
      solution: "We take over every form, document, and submission. You sign — we handle the rest, from transcripts to enrollment forms.",
    },
    {
      problem: "Visa rules are confusing and one mistake causes rejection.",
      solution: "We identify the correct visa category, prepare your full document pack, and guide you step by step through the embassy process.",
    },
    {
      problem: "You arrive in Kazakhstan with no idea where to start.",
      solution: "We coordinate your dormitory registration, airport logistics, and city orientation so your first week is smooth, not stressful.",
    },
    {
      problem: "Opening a bank account in a foreign country feels impossible.",
      solution: "We walk you through student-friendly banks, required documents, and the full account-opening process — in your language.",
    },
    {
      problem: "Small daily tasks pile up: SIM card, health insurance, local registrations.",
      solution: "We stay available throughout your studies for every practical task, from SIM registration to administrative issues that come up later.",
    },
  ],
  ru: [
    {
      problem: "Вы не знаете, какой университет примет вас или подойдёт под ваши цели.",
      solution: "Мы анализируем ваш профиль и подбираем подходящий университет из нашей проверенной партнёрской сети — без догадок, без потраченных заявок.",
    },
    {
      problem: "Бумажная работа бесконечна и на иностранном языке.",
      solution: "Мы берём на себя все формы, документы и подачи. Вы подписываете — мы делаем остальное, от выписок до заявлений на зачисление.",
    },
    {
      problem: "Правила визы запутаны, и одна ошибка ведёт к отказу.",
      solution: "Мы определяем нужную визовую категорию, готовим полный пакет документов и ведём вас шаг за шагом через процесс в посольстве.",
    },
    {
      problem: "Вы приезжаете в Казахстан и не знаете, с чего начать.",
      solution: "Мы координируем регистрацию в общежитии, встречу в аэропорту и ориентацию в городе, чтобы первая неделя прошла гладко.",
    },
    {
      problem: "Открытие банковского счёта в другой стране кажется невозможным.",
      solution: "Мы проводим вас через банки для студентов, необходимые документы и весь процесс открытия счёта — на вашем языке.",
    },
    {
      problem: "Мелкие ежедневные дела накапливаются: SIM-карта, медстраховка, местные регистрации.",
      solution: "Мы остаёмся на связи на протяжении всей учёбы для любых практических задач — от регистрации SIM до административных вопросов.",
    },
  ],
  kz: [
    {
      problem: "Қай университет сізді қабылдайтынын немесе мақсаттарыңызға сай келетінін білмейсіз.",
      solution: "Біз сіздің профиліңізді талдап, тексерілген серіктес желіміздегі дұрыс университетті таңдаймыз — болжамсыз, босқа кеткен өтініштерсіз.",
    },
    {
      problem: "Құжаттама шексіз және шет тілінде.",
      solution: "Біз барлық формаларды, құжаттарды және жіберулерді өз мойнымызға аламыз. Сіз қол қоясыз — қалғанын біз жасаймыз.",
    },
    {
      problem: "Виза ережелері түсініксіз және бір қате бас тартуға әкеледі.",
      solution: "Біз дұрыс виза санатын анықтаймыз, толық құжат пакетін дайындаймыз және елшіліктегі процесте қадам-қадам жетекшілік етеміз.",
    },
    {
      problem: "Сіз Қазақстанға келесіз және неден бастау керектігін білмейсіз.",
      solution: "Біз жатақханаға тіркелуді, әуежай логистикасын және қалаға бейімделуді үйлестіреміз, сондықтан бірінші апта жайлы өтеді.",
    },
    {
      problem: "Шет елде банк шотын ашу мүмкін емес сияқты.",
      solution: "Біз сізді студенттерге ыңғайлы банктер, қажетті құжаттар және шот ашудың толық процесі арқылы жетектейміз — сіздің тіліңізде.",
    },
    {
      problem: "Күнделікті ұсақ істер жиналады: SIM-карта, медициналық сақтандыру, жергілікті тіркеулер.",
      solution: "Біз оқу бойы барлық практикалық тапсырмалар үшін байланыста боламыз — SIM тіркеуден кейін туындайтын әкімшілік мәселелерге дейін.",
    },
  ],
}

const faqsData = {
  en: [
    {
      question: 'How much does your service cost?',
      answer: 'Our initial consultation is completely free. Service fees depend on the scope of support you need — we discuss and agree on everything transparently before you commit.',
    },
    {
      question: 'How long does the full admission process take?',
      answer: 'On average 2–4 months from initial consultation to receiving your admission letter, depending on the university and your document readiness.',
    },
    {
      question: 'Do you guarantee admission?',
      answer: 'While no agency can guarantee admission, our thorough preparation and strategic approach ensures maximum chances. We provide honest assessments from the start.',
    },
    {
      question: 'Do I need to speak Russian or Kazakh?',
      answer: 'Many of our partner programmes are taught in English. We advise you on language requirements during the consultation.',
    },
    {
      question: 'What happens after I arrive in Kazakhstan?',
      answer: 'We support you through dormitory registration, bank account opening, SIM card setup, and any other practical steps. You are never left alone.',
    },
  ],
  ru: [
    {
      question: 'Сколько стоят ваши услуги?',
      answer: 'Первичная консультация полностью бесплатна. Стоимость услуг зависит от объёма необходимой поддержки — мы обсуждаем и согласовываем всё прозрачно до начала работы.',
    },
    {
      question: 'Сколько времени занимает полный процесс поступления?',
      answer: 'В среднем 2–4 месяца от первичной консультации до получения письма о зачислении, в зависимости от университета и готовности ваших документов.',
    },
    {
      question: 'Гарантируете ли вы поступление?',
      answer: 'Ни одно агентство не может гарантировать поступление, но наша тщательная подготовка и стратегический подход обеспечивают максимальные шансы. Мы даём честную оценку с самого начала.',
    },
    {
      question: 'Нужно ли мне знать русский или казахский язык?',
      answer: 'Многие наши партнёрские программы преподаются на английском языке. Мы консультируем по языковым требованиям во время встречи.',
    },
    {
      question: 'Что происходит после приезда в Казахстан?',
      answer: 'Мы помогаем с регистрацией в общежитии, открытием банковского счёта, получением SIM-карты и любыми другими практическими шагами. Вы никогда не останетесь одни.',
    },
  ],
  kz: [
    {
      question: 'Қызметтеріңіз қанша тұрады?',
      answer: 'Алғашқы кеңес толығымен тегін. Қызмет құны қажетті қолдау көлеміне байланысты — біз бәрін ашық талқылап, бастамас бұрын келісеміз.',
    },
    {
      question: 'Толық қабылдау процесі қанша уақыт алады?',
      answer: 'Орташа алғанда 2–4 ай — алғашқы кеңестен қабылдау хатын алуға дейін, университет пен құжаттарыңыздың дайындығына байланысты.',
    },
    {
      question: 'Қабылдауға кепілдік бересіз бе?',
      answer: 'Ешбір агенттік қабылдауға кепілдік бере алмайды, бірақ біздің мұқият дайындығымыз бен стратегиялық көзқарасымыз максималды мүмкіндіктерді қамтамасыз етеді.',
    },
    {
      question: 'Маған орыс немесе қазақ тілін білу керек пе?',
      answer: 'Біздің көптеген серіктес бағдарламаларымыз ағылшын тілінде оқытылады. Кеңес кезінде тіл талаптары бойынша кеңес береміз.',
    },
    {
      question: 'Қазақстанға келгеннен кейін не болады?',
      answer: 'Біз жатақханаға тіркеу, банк шотын ашу, SIM-карта алу және басқа да практикалық қадамдарда көмектесеміз. Сіз ешқашан жалғыз қалмайсыз.',
    },
  ],
}

const statsData = {
  en: [
    { stat: "100%", label: "Paperwork handled by us" },
    { stat: "End-to-end", label: "From application to settling in" },
    { stat: "Always on", label: "Support throughout your studies" },
  ],
  ru: [
    { stat: "100%", label: "Документов оформляем мы" },
    { stat: "Под ключ", label: "От заявки до обустройства" },
    { stat: "Всегда на связи", label: "Поддержка на протяжении учёбы" },
  ],
  kz: [
    { stat: "100%", label: "Құжаттарды біз рәсімдейміз" },
    { stat: "Толық цикл", label: "Өтініштен орналасуға дейін" },
    { stat: "Әрдайым байланыста", label: "Оқу бойы қолдау" },
  ],
}

const pageTexts = {
  en: {
    badge: "OUR SERVICES",
    title: "We Remove Every Barrier Between You and Your Degree",
    subtitle: "Applying to a university abroad is complicated. We take the entire process off your shoulders — documents, visa, arrival, and life setup — so you can focus on your future.",
    problemSolutionTitle: "Every Problem. Our Solution.",
    problemSolutionSubtitle: "Here is what international students struggle with — and exactly how we solve it.",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Ready to Get Started?",
    ctaSubtitle: "Book a free consultation and let us map out your path to a Kazakhstan university — from first document to your first day of lectures.",
    ctaButton: "Book Free Consultation",
  },
  ru: {
    badge: "НАШИ УСЛУГИ",
    title: "Мы устраняем все препятствия между вами и вашим дипломом",
    subtitle: "Поступление в университет за рубежом — это сложно. Мы берём весь процесс на себя — документы, визу, приезд и обустройство — чтобы вы могли сосредоточиться на будущем.",
    problemSolutionTitle: "Каждая проблема. Наше решение.",
    problemSolutionSubtitle: "Вот с чем сталкиваются иностранные студенты — и как именно мы это решаем.",
    faqTitle: "Часто задаваемые вопросы",
    ctaTitle: "Готовы начать?",
    ctaSubtitle: "Запишитесь на бесплатную консультацию, и мы составим ваш путь в казахстанский университет — от первого документа до первого дня лекций.",
    ctaButton: "Записаться на консультацию",
  },
  kz: {
    badge: "ҚЫЗМЕТТЕРІМІЗ",
    title: "Сіз бен дипломыңыз арасындағы барлық кедергілерді жоямыз",
    subtitle: "Шетелдік университетке түсу — күрделі. Біз бүкіл процесті өз мойнымызға аламыз — құжаттар, виза, келу және тұрмысты реттеу — сіз болашаққа назар аударыңыз.",
    problemSolutionTitle: "Әр мәселе. Біздің шешім.",
    problemSolutionSubtitle: "Міне, шетелдік студенттер немен күреседі — және біз оны қалай шешеміз.",
    faqTitle: "Жиі қойылатын сұрақтар",
    ctaTitle: "Бастауға дайынсыз ба?",
    ctaSubtitle: "Тегін кеңеске жазылыңыз, біз Қазақстан университетіне жолыңызды құрамыз — бірінші құжаттан бірінші дәріске дейін.",
    ctaButton: "Тегін кеңес алу",
  },
}

export default function ServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { lang } = useLang()

  const problems = problemsData[lang]
  const faqs = faqsData[lang]
  const stats = statsData[lang]
  const texts = pageTexts[lang]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4">
                {texts.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground mb-4 text-balance">
                {texts.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {texts.subtitle}
              </p>
            </div>
          </FadeIn>

          {/* What makes us different */}
          <FadeIn delay={60}>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-20">
              {stats.map((item) => (
                <Card key={item.label} className="p-5 text-center border-secondary/20 bg-secondary/5">
                  <p className="text-2xl md:text-3xl font-black text-secondary mb-1">{item.stat}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Problem → Solution cards */}
          <FadeIn delay={100}>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-3 text-center">
              {texts.problemSolutionTitle}
            </h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-12 max-w-xl mx-auto text-sm md:text-base">
              {texts.problemSolutionSubtitle}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-16 md:mb-20">
              {problems.map((item, i) => (
                <Card key={i} className="p-5 md:p-6 border-border hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.problem}</p>
                  </div>
                  <div className="flex items-start gap-3 pt-3 border-t border-border">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item.solution}</p>
                  </div>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={140}>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-8 text-center">
              {texts.faqTitle}
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto mb-14 md:mb-20">
              {faqs.map((faq, i) => (
                <Card
                  key={i}
                  className="p-5 cursor-pointer hover:shadow-sm transition-shadow border-border"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm md:text-base font-bold text-foreground">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  {expandedFaq === i && (
                    <p className="text-muted-foreground mt-4 pt-4 border-t border-border text-sm">{faq.answer}</p>
                  )}
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={180}>
            <Card className="p-8 md:p-12 bg-primary border-0 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3">
                {texts.ctaTitle}
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm md:text-base">
                {texts.ctaSubtitle}
              </p>
              <Link href="/contact">
                <Button className="bg-secondary text-secondary-foreground px-8 py-3 text-base font-semibold">
                  {texts.ctaButton}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>
          </FadeIn>

        </div>
      </main>

      <Footer />
    </div>
  )
}
