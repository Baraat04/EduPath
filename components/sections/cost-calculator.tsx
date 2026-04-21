"use client"

import { useState } from "react"
import { GraduationCap, Home, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fields = [
  { value: "medicine", label: "Medicine and Health", range: "$4,500 - $6,200" },
  { value: "cs", label: "Computer Science and IT", range: "$3,200 - $4,800" },
  { value: "business", label: "Business and Economics", range: "$2,800 - $4,500" },
  { value: "engineering", label: "Engineering", range: "$3,000 - $5,000" },
]

export function CostCalculator() {
  const [selectedField, setSelectedField] = useState("medicine")
  const [accommodation, setAccommodation] = useState<"dorm" | "studio">("dorm")

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const getEstimate = () => {
    const field = fields.find(f => f.value === selectedField)
    if (!field) return "$3,850 - $5,200"
    
    const baseRange = field.range.split(" - ")
    const low = parseInt(baseRange[0].replace(/\D/g, ""))
    const high = parseInt(baseRange[1].replace(/\D/g, ""))
    const accCost = accommodation === "dorm" ? 800 : 2400
    
    return `$${formatNumber(low + accCost)} - $${formatNumber(high + accCost)}`
  }

  return (
    <section className="py-20 md:py-32 bg-primary overflow-hidden relative">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative z-10 text-white">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">
            Estimate Your Future
          </h2>
          <p className="text-white/70 text-lg mb-12 leading-relaxed">
            Planning is the first step to success. Use our calculator to understand the investment required for your global education journey.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Tuition Fees</h4>
                <p className="text-white/60">Competitive rates for world-class programs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Home className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Living Expenses</h4>
                <p className="text-white/60">Modern dorms and affordable urban living.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 editorial-shadow">
          <h3 className="text-2xl font-black mb-8 font-headline">Cost Estimator</h3>
          
          <div className="space-y-6 mb-10">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-3">
                Target Field
              </label>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="w-full bg-muted border-none rounded-lg p-4 h-auto">
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map(field => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-3">
                Accommodation Style
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAccommodation("dorm")}
                  className={`p-4 rounded-lg font-bold transition-all ${
                    accommodation === "dorm"
                      ? "bg-secondary/10 border-2 border-secondary text-secondary"
                      : "bg-muted border-2 border-transparent text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  University Dorm
                </button>
                <button
                  onClick={() => setAccommodation("studio")}
                  className={`p-4 rounded-lg font-bold transition-all ${
                    accommodation === "studio"
                      ? "bg-secondary/10 border-2 border-secondary text-secondary"
                      : "bg-muted border-2 border-transparent text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Private Studio
                </button>
              </div>
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg border-2 border-dashed border-border flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                Estimated Annual Total
              </p>
              <p className="text-2xl md:text-3xl font-black text-secondary">
                {getEstimate()}
              </p>
            </div>
            <Calculator className="text-border" size={32} />
          </div>

          <Button className="w-full mt-8 bg-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-900 transition-all">
            Get Detailed PDF Guide
          </Button>
        </div>
      </div>
    </section>
  )
}
