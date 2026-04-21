import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto bg-primary rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-24 text-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary-container rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-tertiary-fixed rounded-full blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 md:mb-12 max-w-2xl mx-auto">
            Applications for the next academic semester are now open. Get your free eligibility check today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Button
              size="lg"
              className="bg-secondary-fixed text-on-secondary-fixed px-8 md:px-12 py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-secondary-container transition-all"
            >
              Start Your Application
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white px-8 md:px-12 py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-white/20 transition-all"
            >
              Contact an Advisor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
