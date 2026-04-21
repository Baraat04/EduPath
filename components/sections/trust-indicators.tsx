import { BadgeCheck } from "lucide-react"

const countryAvatars = [
  {
    alt: "India",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMjHGa3q_PQ3VXp88a8P0DpXIdmbm68S05HrCNOvi7S4TU9TVdcelNXYcO8QUKtrWA_M_hDH0EnoeVHFnK0sxiTAsgU-xEHCE7eHUGblK85MECzVBt_pJ93RDvuBat0sSuRDvgiyJ4fYGLoYJyYqyExne59sYjzNb9NiqqaVkKJMKxW3VvzdZt8K9X6yFYRBNgttWgIIs3qU4nFbU1YzxjDh5U65TdzkrFWIj_4n_iersv3hWZiYuY8yNwl_KnSqCQMHp80HwVw0Ch",
  },
  {
    alt: "Nigeria",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc0NUL8kSGHXCUE8RL_IHACcY9BqnIblq3q9nyEqQ8kFqeYBq9BGsXQSwRJB4-miAWCns_k_BGagG5AgwP27pGHn4Ykbh8ZcC8vCO3vxd4hgIUTnOdGWnkk8LhcG_aOs9a2BIT8y_RtcnrrSiVsYfbiaMhP6iREzEscl2s2jx4irWnlhYIKnXR2xuyKZl2tRfVkks6MNKuGhw9rEdwoQzEajo7pC1QH9rN0kTEIeoQ9q16aFiImHS0iYbHbcp_zyAdL-qxXkB46935",
  },
  {
    alt: "Kenya",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpJXQzdfpcRA8_TJAfx0OsPfYtIqP9rMowHn4ykde9xdHqWs4_KBxWwNHtWx1eEi3QVpryqX3H4VDUASMdTdZA_pHyKepDjogU83rT6FYam0_00crUqFhIx75_zrdkZJz8Zkd2lgHtBKezzZwgO1WwGyOiyIM06t1u1EnVw2ekIneEjpDpJFl7nxNZx8hwiPhh8zq02L2DVhEUbXz4CjeAnvpjcXXwt0dpruj4GPrl031DiubRmCwRpPzUe9BL5bhilIvB_F8dnuV3",
  },
  {
    alt: "Ghana",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsZ0ifMcQ1-Z9FGOX6PGDhczTR7CDFhirR9zZakZEESOR4Qg8q5ghYZAb5nnIBQVlAIjDe7tBru2cTW2iTRKjGSx5vGQxA5aeC5CQzuFKzAhim3rKioliQjcj0V2csbyjv9ttD2nBxiK3qzrKH6irFi_R7PP0kfu68a8y-s8qotRroVVHbRQYMTE--6Cgnn_e_rzmv11FTPoFndrmoeXdp80kyN46T43Qq_TQWOQ9DctII7m--SDC_a9opwMot7_CW_erG4kF2uvje",
  },
]

export function TrustIndicators() {
  return (
    <section className="bg-white py-12 relative -mt-16 z-20 mx-4 md:mx-8 rounded-2xl editorial-shadow">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-wrap justify-around items-center gap-8">
        {/* Visa Success Rate */}
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-4xl font-black text-secondary">98%</span>
          <span className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Visa Success Rate
          </span>
        </div>

        <div className="h-8 w-px bg-border hidden md:block" />

        {/* Global Community */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {countryAvatars.map((avatar) => (
              <div
                key={avatar.alt}
                className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
              >
                <img
                  alt={avatar.alt}
                  src={avatar.src}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Global Community
          </span>
        </div>

        <div className="h-8 w-px bg-border hidden md:block" />

        {/* Success Stories */}
        <div className="flex items-center gap-4">
          <BadgeCheck className="text-tertiary-fixed-dim fill-tertiary-fixed-dim" size={24} />
          <span className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Success Stories
          </span>
        </div>
      </div>
    </section>
  )
}
