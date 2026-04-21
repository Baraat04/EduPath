'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Send, CheckCircle, ChevronDown, MessageCircle } from 'lucide-react'
import { useWishlist } from '@/lib/wishlist-context'
import { FadeIn } from '@/components/fade-in'
import { useLang } from '@/lib/lang-context'
import { createSubmission } from '@/lib/submissions-supabase'

type Subject = 'consultation' | 'partnership'

export default function ContactPage() {
  const { items: wishlistItems } = useWishlist()
  const { t } = useLang()

  // ── Shared ──────────────────────────────────────────────────────────────────
  const [subject, setSubject] = useState<Subject>('consultation')
  const [submitted, setSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showFaqs, setShowFaqs] = useState(false)

  // ── Consultation fields ──────────────────────────────────────────────────────
  const [consultForm, setConsultForm] = useState({
    name: '', email: '', phone: '', country: '', message: '',
  })

  // ── Partnership fields ───────────────────────────────────────────────────────
  const [partnerForm, setPartnerForm] = useState({
    name: '', email: '', phone: '', companyCountry: '', companyName: '',
    companyDescription: '', consultationGoal: '',
  })

  const faqs = [
    {
      question: t('contact.faq1.question'),
      answer: t('contact.faq1.answer'),
    },
    {
      question: t('contact.faq2.question'),
      answer: t('contact.faq2.answer'),
    },
    {
      question: t('contact.faq3.question'),
      answer: t('contact.faq3.answer'),
    },
    {
      question: t('contact.faq4.question'),
      answer: t('contact.faq4.answer'),
    },
  ]

  const handleConsultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConsultForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPartnerForm(prev => ({ ...prev, [name]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = subject === 'consultation' ? consultForm : partnerForm
      const nameParts = form.name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Build message with all relevant info
      let message = ''
      if (subject === 'consultation') {
        message = `Country: ${consultForm.country}\n\n${consultForm.message}`
        if (wishlistItems.length > 0) {
          message += `\n\nInterested Universities:\n${wishlistItems.map(u => `- ${u.name}`).join('\n')}`
        }
      } else {
        message = `Company: ${partnerForm.companyName}\nCountry: ${partnerForm.companyCountry}\n\nAbout Company:\n${partnerForm.companyDescription}\n\nConsultation Goal:\n${partnerForm.consultationGoal}`
      }

      const result = await createSubmission({
        type: subject === 'consultation' ? 'consultation' : 'contact',
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        phone: form.phone,
        message,
        source: 'contact_form',
      })

      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setConsultForm({ name: '', email: '', phone: '', country: '', message: '' })
          setPartnerForm({ name: '', email: '', phone: '', companyCountry: '', companyName: '', companyDescription: '', consultationGoal: '' })
          setSubmitted(false)
        }, 4000)
      } else {
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls = "w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
  const labelCls = "block text-sm font-medium text-foreground mb-1.5"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <FadeIn>
            <div className="text-center mb-10 md:mb-14">
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4">
                {t('contact.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground mb-4 text-balance">
                {t('contact.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-14">

            {/* ── Form ── */}
            <div className="md:col-span-3">
              <FadeIn delay={60}>
                <Card className="p-6 md:p-8">
                  {submitted ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t('contact.successTitle')}</h3>
                        <p className="text-muted-foreground text-sm">
                          {t('contact.sent')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Subject — always first */}
                      <div>
                        <label className={labelCls}>{t('contact.subjectLabel')}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {([
                            { value: 'consultation', label: t('contact.consultation') },
                            { value: 'partnership', label: t('contact.partnership') },
                          ] as { value: Subject; label: string }[]).map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setSubject(opt.value)}
                              className={`py-2.5 px-4 rounded-lg border-2 text-sm font-semibold transition-colors ${
                                subject === opt.value
                                  ? 'border-secondary bg-secondary/10 text-secondary'
                                  : 'border-border text-muted-foreground hover:border-secondary/50'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ── Consultation form ── */}
                      {subject === 'consultation' && (
                        <>
                          <div>
                            <label className={labelCls}>{t('contact.name')}</label>
                            <input type="text" name="name" value={consultForm.name} onChange={handleConsultChange} required placeholder={t('contact.namePlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.email')}</label>
                            <input type="email" name="email" value={consultForm.email} onChange={handleConsultChange} required placeholder={t('contact.emailPlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>
                              {t('contact.phone')}
                            </label>
                            <div className="flex items-center gap-2 mb-1.5">
                              <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                              <p className="text-xs text-muted-foreground">
                                {t('contact.phoneHint')}
                              </p>
                            </div>
                            <input type="tel" name="phone" value={consultForm.phone} onChange={handleConsultChange} placeholder={t('contact.phonePlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.country')}</label>
                            <input type="text" name="country" value={consultForm.country} onChange={handleConsultChange} required placeholder={t('contact.countryPlaceholder')} className={inputCls} />
                          </div>
                          {wishlistItems.length > 0 && (
                            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
                              <p className="text-xs font-semibold text-secondary mb-1.5">{t('contact.wishlistIncluded')}:</p>
                              <ul className="space-y-0.5">
                                {wishlistItems.map((u) => (
                                  <li key={u.id} className="text-xs text-muted-foreground">• {u.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div>
                            <label className={labelCls}>{t('contact.message')}</label>
                            <textarea name="message" value={consultForm.message} onChange={handleConsultChange} required rows={4} placeholder={t('contact.messagePlaceholder')} className={`${inputCls} resize-none`} />
                          </div>
                        </>
                      )}

                      {/* ── Partnership form ── */}
                      {subject === 'partnership' && (
                        <>
                          <div>
                            <label className={labelCls}>{t('contact.name')}</label>
                            <input type="text" name="name" value={partnerForm.name} onChange={handlePartnerChange} required placeholder={t('contact.namePlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.email')}</label>
                            <input type="email" name="email" value={partnerForm.email} onChange={handlePartnerChange} required placeholder={t('contact.companyEmailPlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.phone')}</label>
                            <div className="flex items-center gap-2 mb-1.5">
                              <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                              <p className="text-xs text-muted-foreground">
                                {t('contact.phoneHintShort')}
                              </p>
                            </div>
                            <input type="tel" name="phone" value={partnerForm.phone} onChange={handlePartnerChange} placeholder={t('contact.phonePlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.companyCountry')}</label>
                            <input type="text" name="companyCountry" value={partnerForm.companyCountry} onChange={handlePartnerChange} required placeholder={t('contact.companyCountryPlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.companyName')}</label>
                            <input type="text" name="companyName" value={partnerForm.companyName} onChange={handlePartnerChange} required placeholder={t('contact.companyNamePlaceholder')} className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.companyAbout')}</label>
                            <textarea name="companyDescription" value={partnerForm.companyDescription} onChange={handlePartnerChange} required rows={3} placeholder={t('contact.companyAboutPlaceholder')} className={`${inputCls} resize-none`} />
                          </div>
                          <div>
                            <label className={labelCls}>{t('contact.consultationGoal')}</label>
                            <textarea name="consultationGoal" value={partnerForm.consultationGoal} onChange={handlePartnerChange} required rows={3} placeholder={t('contact.consultationGoalPlaceholder')} className={`${inputCls} resize-none`} />
                          </div>
                        </>
                      )}

<Button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-secondary-foreground py-3 text-sm font-semibold">
  {isSubmitting ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      Sending...
    </span>
  ) : (
    <>
      <Send className="w-4 h-4 mr-2" />
      {t('contact.send')}
    </>
  )}
  </Button>
                    </form>
                  )}
                </Card>
              </FadeIn>
            </div>

            {/* ── Contact Info ── */}
            <div className="md:col-span-2 space-y-4">
              <FadeIn delay={80}>
                <Card className="p-5 border-l-4 border-secondary">
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-0.5 text-sm">{t('contact.phoneLabel')}</h3>
                      <p className="text-muted-foreground text-sm">+7 (700) 123-45-67</p>
                      <p className="text-xs text-muted-foreground">{t('contact.phoneHours')}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{t('contact.whatsappAvailable')}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={100}>
                <Card className="p-5 border-l-4 border-secondary">
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-0.5 text-sm">{t('contact.emailLabel')}</h3>
                      <p className="text-muted-foreground text-sm">support@edupath.kz</p>
                      <p className="text-xs text-muted-foreground">{t('contact.emailResponse')}</p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>

          {/* FAQ */}
          <FadeIn delay={120}>
            <Card className="p-6 md:p-10 bg-secondary/5 border-secondary/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold font-headline text-foreground mb-0.5">{t('contact.faqTitle')}</h2>
                  <p className="text-muted-foreground text-sm">{t('contact.faqSubtitle')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowFaqs(!showFaqs)}>
                    {showFaqs ? t('contact.hideFaqs') : t('contact.viewFaqs')}
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFaqs ? 'rotate-180' : ''}`} />
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-secondary text-secondary-foreground"
                    onClick={() => { setSubject('consultation'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  >
                    {t('contact.bookConsultation')}
                  </Button>
                </div>
              </div>

              {showFaqs && (
                <div className="space-y-3 mt-4">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-background rounded-xl p-4 cursor-pointer hover:shadow-sm transition-shadow border border-border"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                      </div>
                      {expandedFaq === i && (
                        <p className="text-muted-foreground mt-3 pt-3 border-t border-border text-sm">{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </FadeIn>

        </div>
      </main>

      <Footer />
    </div>
  )
}
