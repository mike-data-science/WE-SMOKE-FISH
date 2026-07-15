import { CheckCircle2, Award, Users, Flame } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background transition-colors duration-500 overflow-x-hidden">
      
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/storefront.jpg" 
            alt="We Smoke Fish storefront" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">About Us</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-2 tracking-tight leading-[0.95]">
            Our Story
          </h1>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,18 1440,30 L1440,60 L0,60 Z" fill="var(--bg)"/>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="wave-lines">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/8 border border-accent/15">
                <Flame className="h-4 w-4 text-coral" />
                <span className="text-sm font-semibold text-accent tracking-wide uppercase">The Smokehouse</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.05] tracking-tight">
                Produced Entirely<br />By Us
              </h2>
              
              <p className="text-lg text-muted leading-relaxed">
                We offer smoked fish, air-dried fish, and other delicacies carefully prepared for authentic taste and freshness. Our state-of-the-art production facility in Chișinău ensures that every product meets the highest standards of quality.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Every piece of fish is hand-selected, carefully portioned, and prepared using recipes that have been perfected over generations. We believe in transparency, quality, and the art of slow smoking.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Raw materials are carefully portioned and prepared",
                  "Approved company recipes with generations of history",
                  "Strict quality control at every stage of production",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/interior.png" alt="Premium interior" className="w-full h-52 object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl bg-accent p-6 flex items-center justify-center h-44">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/flying-fish.jpg" alt="Flying fish" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/owner.jpg" alt="Our founder" className="w-full h-60 object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/mascot.jpg" alt="Our mascot" className="w-full h-40 object-contain bg-warm p-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">What We Stand For</h2>
            <p className="text-muted mt-3 text-lg">Our values guide every product we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Award className="h-7 w-7" />, 
                title: "Premium Quality", 
                desc: "Only the finest fish, smoked low and slow using time-tested methods for unmatched flavor." 
              },
              { 
                icon: <Flame className="h-7 w-7" />, 
                title: "Traditional Craft", 
                desc: "Recipes passed down through generations, preserving the authentic taste of artisan smoking." 
              },
              { 
                icon: <Users className="h-7 w-7" />, 
                title: "Family Values", 
                desc: "A family-run business built on trust, integrity, and a passion for feeding people well." 
              },
            ].map((value, i) => (
              <div key={i} className={`animate-fade-in-up delay-${(i+1)*100} bg-surface rounded-3xl p-8 border border-border card-hover text-center`}>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent/10 text-accent mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Card */}
      <section className="wave-bg">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="bg-surface rounded-[2rem] overflow-hidden border border-border shadow-xl">
            <div className="relative h-64">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/storefront-wide.png"
                className="w-full h-full object-cover"
              >
                <source src="/videos/5.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            <div className="p-8 md:p-10 -mt-8 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl">Chișinău Flagship Store</h3>
                  <p className="text-sm text-muted">Șoseaua Balcani 7B · Open 10:00–22:00</p>
                </div>
              </div>
              <p className="text-muted leading-relaxed">
                Visit our flagship location featuring a full deli counter, fresh daily selections, and our signature cat mural. Taste before you buy — we love sharing our passion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
