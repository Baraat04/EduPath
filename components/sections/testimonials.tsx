import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rahul S.",
    origin: "from Mumbai, India",
    quote: "Studying Computer Science at AITU has been the best decision. The facilities are amazing and the tech scene in Astana is booming.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfOwNPrbyck_0An5gUXgz9j50G9DExlyLHY7PP3QHzNqu3IRjdg9FUV6asJoqteBigwPjw7BM-Slu08LcHfUwuF4q2jJye3Tl7TS5XzwiKKn5BV65WmSusXl34SnZCBQotScoVPo_wIq4f3-H_tADLWVkCdjQ1D2IwHwe15WSOSEnamZONtHsCK-V8DADhDs7V2AzLARlI9EmDhFzJh_mOgzqBG00Scyl7CsTBhLaFtk5nvTzAMGGP1fouVWmx-UfMAy891mZ3Pcl1",
  },
  {
    name: "Amina O.",
    origin: "from Abuja, Nigeria",
    quote: "The affordable medical programs here are world-class. My clinical practice at KazNU is providing me with incredible hands-on experience.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxRtDabI_N7Awz6WZ9gjgr91W8lDWAxPWJTOGTWveDA43mRD7KQY8tk8xTY8JPzHiDm-3Jx532jHJz2c0c0HUNaDoENBaOQfhRpPcXiOUQa8-5Fzb4HA4TKH8aK4pXkVAojV-5enba-lz6xiehYReYjtFHNg16-yyYmGGGxVZHjTTlQf1cOMCTqoQe6m7l58ifRmUwQWEe3hEv6JOYJrn7l8fQAPrWbbcg8sEDD8hYuU4NCQyTFleHAfmn9NcT_05G50rXVBTESnUs",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Featured Image */}
          <div className="relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden editorial-shadow">
              <img
                className="w-full h-full object-cover"
                alt="Young African woman student with headphones and books"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWOmjeiLkLiS03ASEtRucV-7DxggCWNbLsT7nr2Y9YyfDkVNvvGqrlkmd5ZZbirJVZjWZrryPfchUR9tPALSJcouwhXbmqyHTvdNOD-Oaj-54IeCAEPCj-TK00LbagbWYQSYnQj1Ka5AxcYkzQUAnqqNRUbl_QwMxDi7YxC1tsZpX4M1n0oKQlf9FWnLBcqT65wDKFPEupSO8y1QoaAdyf9Bl6aAl0aNLbHBEyCPqYFxxWj05s2-oaHp9-SBhshUC1fwvaDhXZY8Zk"
              />
            </div>
            
            {/* Floating Quote Card */}
            <div className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 bg-secondary p-6 md:p-8 rounded-2xl max-w-xs editorial-shadow hidden md:block">
              <Quote className="text-white/30 w-10 h-10 mb-4" />
              <p className="text-white font-medium italic">
                &quot;EduPath made the transition from Lagos to Almaty seamless. I felt supported at every single step.&quot;
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
              Join Thousands of International Students
            </h2>

            <div className="space-y-10 md:space-y-12">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="flex gap-4 md:gap-6 items-start">
                  <div className="w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden shrink-0 border-4 border-white editorial-shadow">
                    <img
                      className="w-full h-full object-cover"
                      alt={testimonial.name}
                      src={testimonial.avatar}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl mb-2">
                      {testimonial.name}
                      <span className="text-muted-foreground font-normal text-sm ml-2">
                        {testimonial.origin}
                      </span>
                    </h4>
                    <p className="text-muted-foreground leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
