"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  User, 
  FileText, 
  CreditCard, 
  BadgeCheck, 
  ArrowLeft, 
  ArrowRight,
  IdCard,
  GraduationCap,
  Languages,
  CheckCircle,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Documents", icon: FileText },
  { id: 3, label: "Services", icon: CreditCard },
  { id: 4, label: "Review", icon: BadgeCheck },
]

const plans = [
  {
    id: "free",
    name: "Essential",
    price: "Free",
    description: "Direct university portal access and guidelines.",
    features: [
      { name: "Application Portal", included: true },
      { name: "Standard Support", included: true },
      { name: "Visa Fast-track", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$299",
    description: "Complete assistance from document prep to arrival.",
    popular: true,
    features: [
      { name: "Personal Academic Coach", included: true },
      { name: "Visa Concierge Service", included: true },
      { name: "Accommodation Search", included: true },
    ],
  },
  {
    id: "diplomat",
    name: "Diplomat",
    price: "$899",
    description: "The elite experience with 24/7 dedicated support.",
    features: [
      { name: "1-on-1 VIP Mentorship", included: true },
      { name: "Scholarship Hunting", included: true },
      { name: "Airport Pickup and SIM", included: true },
    ],
  },
]

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState("premium")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-tight text-primary mb-4">
            Start Your Journey
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your path to academic excellence in the heart of Central Asia begins here. 
            Complete your application in four focused steps.
          </p>
        </header>

        {/* Stepper */}
        <div className="relative flex justify-between items-center mb-12 md:mb-16 px-4">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-muted -z-10" />
          <div 
            className="absolute top-6 left-0 h-0.5 bg-secondary -z-10 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const Icon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = step.id < currentStep

            return (
              <div key={step.id} className="flex flex-col items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ring-8 ring-background transition-all ${
                    isActive
                      ? "bg-secondary text-white"
                      : isCompleted
                      ? "bg-secondary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span
                  className={`font-headline font-semibold text-xs md:text-sm ${
                    isActive ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm border border-border">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <section className="space-y-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div className="flex-1 w-full space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold font-headline ml-1">
                        Full Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        className="h-14 bg-muted border-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold font-headline ml-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 bg-muted border-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold font-headline ml-1">
                        Country of Origin
                      </label>
                      <Select>
                        <SelectTrigger className="h-14 bg-muted border-none">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kz">Kazakhstan</SelectItem>
                          <SelectItem value="uz">Uzbekistan</SelectItem>
                          <SelectItem value="tr">Turkey</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold font-headline ml-1">
                        Start Year
                      </label>
                      <Select>
                        <SelectTrigger className="h-14 bg-muted border-none">
                          <SelectValue placeholder="Select Intake" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fall-2024">Fall 2024</SelectItem>
                          <SelectItem value="spring-2025">Spring 2025</SelectItem>
                          <SelectItem value="fall-2025">Fall 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold font-headline ml-1">
                      Desired Program
                    </label>
                    <Input
                      placeholder="e.g. B.Sc. in Computer Science, Nazarbayev University"
                      className="h-14 bg-muted border-none"
                    />
                  </div>
                </div>

                {/* Side Image */}
                <div className="hidden lg:block w-72 h-96 rounded-2xl overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Modern university campus"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4NQGWJtnApkxJbdeYuXjnWFNs3m3UKD-sz46hSD6PxmnCx2sziASGrKIVuTzdHlVUwzIWIJi5aVkYYa15omFiMNrlnHxVyGsXn4wl7-mtqQYSvVFIEgefA8ttiafFPoxjdS2fjX92FAADVFHWVtgFO_Bl4UTTrJoC-gq7GLJa5bmncs6AZr7v5WLmmiFkinQWkduNu1CzPyb5S2AcxUghfH8z9Zg4PjgCg9fseU09KWv_t11fi7fZsi8ClVaX1cDqwdq6PcVr9up-"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <section className="space-y-10">
              <div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-6">
                  Required Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: IdCard, title: "Passport Copy", desc: "PDF, JPEG or PNG (Max 5MB)" },
                    { icon: GraduationCap, title: "HS Transcript", desc: "Official academic records" },
                    { icon: Languages, title: "English Proficiency", desc: "IELTS, TOEFL, or Duolingo" },
                  ].map((doc) => (
                    <div
                      key={doc.title}
                      className="group cursor-pointer border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-secondary hover:bg-secondary/5 transition-all"
                    >
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                        <doc.icon size={24} />
                      </div>
                      <span className="font-headline font-bold text-sm mb-1">{doc.title}</span>
                      <span className="text-xs text-muted-foreground">{doc.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Services / Pricing */}
          {currentStep === 3 && (
            <section className="space-y-10">
              <div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-6">
                  Concierge Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all cursor-pointer ${
                        plan.popular
                          ? "bg-primary text-white relative ring-4 ring-secondary/20"
                          : selectedPlan === plan.id
                          ? "bg-secondary/10 border-2 border-secondary"
                          : "bg-muted border border-transparent hover:border-secondary/20"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 p-4">
                          <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase rounded-full">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wider ${
                          plan.popular ? "bg-primary-container text-on-primary-container" : "bg-white"
                        }`}>
                          {plan.name}
                        </span>
                        <h4 className="text-3xl font-black font-headline mt-4">{plan.price}</h4>
                        <p className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                          {plan.description}
                        </p>
                      </div>
                      <ul className="space-y-4 flex-1 mt-6">
                        {plan.features.map((feature) => (
                          <li key={feature.name} className={`flex items-center gap-3 text-sm ${!feature.included && "opacity-30"}`}>
                            {feature.included ? (
                              <CheckCircle size={18} className={plan.popular ? "text-secondary-fixed" : "text-secondary"} />
                            ) : (
                              <X size={18} />
                            )}
                            <span>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full mt-6 py-4 rounded-xl font-bold ${
                          plan.popular
                            ? "bg-secondary text-white hover:bg-secondary-fixed hover:text-on-secondary-fixed"
                            : selectedPlan === plan.id
                            ? "bg-secondary text-white"
                            : "bg-white text-primary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <section className="space-y-10 text-center py-12">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <BadgeCheck className="text-secondary" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">
                  Review Your Application
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Please review all the information you have provided. Once submitted, 
                  our team will review your application within 2-3 business days.
                </p>
              </div>
              <Button size="lg" className="px-12 py-6 text-lg rounded-xl">
                Submit Application
              </Button>
            </section>
          )}

          {/* Navigation */}
          <footer className="mt-12 md:mt-16 flex justify-between items-center pt-8 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground italic hidden sm:block">
                Step {currentStep} of {steps.length}
              </span>
              {currentStep < 4 && (
                <Button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold shadow-lg"
                >
                  Next: {steps[currentStep]?.label}
                  <ArrowRight size={18} />
                </Button>
              )}
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  )
}
