'use client';

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    text: "The best smoked salmon I've ever had. You can instantly taste the quality and the traditional wood-fired process.",
    name: "Alexandru C.",
    role: "Local Food Critic",
    rating: 5,
    avatar: "/images/owner.jpg" // Placeholder for an avatar
  },
  {
    id: 2,
    text: "We ordered their catering for a corporate event. The presentation was flawless and the fish was the highlight of the night.",
    name: "Maria S.",
    role: "Event Organizer",
    rating: 5,
    avatar: "/images/interior.png" // Placeholder
  },
  {
    id: 3,
    text: "An absolute gem! The yucola here is unmatched. I drive across town just to pick up my weekly order.",
    name: "Ion P.",
    role: "Regular Customer",
    rating: 5,
    avatar: "/images/storefront.jpg" // Placeholder
  },
  {
    id: 4,
    text: "Exceptional flavor profiles. You can tell they don't use any artificial preservatives. Truly artisanal.",
    name: "Elena V.",
    role: "Chef",
    rating: 5,
    avatar: "/images/flying-fish.jpg" // Placeholder
  },
  {
    id: 5,
    text: "My entire family loves the hot smoked sturgeon. It melts in your mouth!",
    name: "Dmitri K.",
    role: "Loyal Client",
    rating: 5,
    avatar: "/images/owner.jpg"
  },
  {
    id: 6,
    text: "From the beautiful packaging to the incredible taste, We Smoke Fish delivers a 5-star experience every time.",
    name: "Ana T.",
    role: "Food Blogger",
    rating: 5,
    avatar: "/images/interior.png"
  }
];

export default function Testimonials({ variant = 'grid' }: { variant?: 'grid' | 'marquee' | 'featured' | 'masonry' | 'minimal' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Helper to render stars
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}
    </div>
  );

  // 1. GRID VARIANT (Standard)
  if (variant === 'grid') {
    return (
      <section className="bg-warm py-24 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Variant 1: Grid</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="relative bg-surface rounded-3xl p-8 border border-border">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-white/5" />
                <div className="mb-6">{renderStars(review.rating)}</div>
                <p className="text-lg text-muted italic mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="text-foreground font-bold">{review.name}</h4>
                  <p className="text-sm text-accent">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. MARQUEE VARIANT (Horizontal Scroll)
  if (variant === 'marquee') {
    return (
      <section className="bg-warm py-24 relative z-10 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Variant 2: Marquee</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">Wall of Love</h2>
        </div>
        <div className="flex gap-6 animate-marquee whitespace-nowrap pl-6 pb-4">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={`${review.id}-${i}`} className="inline-block w-[350px] shrink-0 whitespace-normal bg-surface rounded-2xl p-6 border border-border">
              <div className="mb-4">{renderStars(review.rating)}</div>
              <p className="text-muted text-sm italic mb-6 line-clamp-3">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover grayscale" />
                <div>
                  <h4 className="text-foreground font-bold text-sm">{review.name}</h4>
                  <p className="text-xs text-accent">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 3. FEATURED VARIANT (Spotlight)
  if (variant === 'featured') {
    const featured = reviews[activeIndex];
    return (
      <section className="bg-[#0d0d0d] py-24 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Variant 3: Featured Spotlight</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative">
                <img src={featured.avatar} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black text-white">{featured.name}</h3>
                  <p className="text-accent font-semibold">{featured.role}</p>
                </div>
              </div>
            </div>
            {/* Quote Side */}
            <div className="space-y-8">
              <Quote className="h-16 w-16 text-coral opacity-50" />
              <div className="mb-2">{renderStars(featured.rating)}</div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                "{featured.text}"
              </h2>
              <div className="flex gap-4 pt-8">
                <button onClick={prevReview} className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={nextReview} className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. MASONRY VARIANT
  if (variant === 'masonry') {
    return (
      <section className="bg-warm py-24 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Variant 4: Masonry Grid</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">Community Feedback</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="break-inside-avoid bg-surface rounded-2xl p-6 border border-border hover:border-white/20 transition-colors">
                <div className="mb-4">{renderStars(review.rating)}</div>
                <p className="text-muted italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">{review.name}</h4>
                    <p className="text-xs text-accent">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 5. MINIMAL VARIANT
  if (variant === 'minimal') {
    const minimal = reviews[activeIndex];
    return (
      <section className="bg-[#141414] py-32 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm font-semibold text-white/30 uppercase tracking-wider block mb-12">Variant 5: Minimal Text Slider</span>
          
          <div className="min-h-[200px] flex flex-col justify-center transition-opacity duration-300">
            <p className="text-2xl md:text-4xl text-white font-light italic leading-relaxed">
              "{minimal.text}"
            </p>
          </div>
          
          <div className="mt-12 flex flex-col items-center">
            <h4 className="text-white font-bold tracking-widest uppercase">{minimal.name}</h4>
            <p className="text-white/40 text-sm mt-1">{minimal.role}</p>
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-coral' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
