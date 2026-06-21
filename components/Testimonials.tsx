import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";

// Single real, verifiable testimonial (LeadzGalaxy / Amit Menon — see /case-studies).
// Placeholder testimonials were removed; add new ones here only with real
// attribution (name + business + permission, ideally a photo/link).
const Testimonials = () => {
  return (
    <section className="py-8 md:py-18 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
        </div>

        <figure className="card-surface p-6 md:p-8 relative max-w-2xl mx-auto reveal">
          <Quote className="w-8 h-8 text-primary/20 mb-4" />

          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="text-base md:text-lg text-foreground mb-5 leading-relaxed">
            &ldquo;This platform completely transformed our lead generation process. What
            used to take our team hours of manual work now happens automatically in minutes.
            We&rsquo;ve been able to 10x our business because we can now focus on closing
            deals instead of collecting data.&rdquo;
          </blockquote>

          <figcaption className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-bold text-sm">Amit Menon</p>
              <p className="text-xs text-muted-foreground">Founder, LeadzGalaxy.com</p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              Read the case study <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
