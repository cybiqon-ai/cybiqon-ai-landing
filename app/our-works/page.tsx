"use client";

import { useState, useMemo } from "react";
import {
  Globe,
  Puzzle,
  ExternalLink,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Category = "all" | "websites" | "extensions" | "3d";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: "websites" | "extensions" | "3d";
  liveUrl: string;
  tags: string[];
  featured?: boolean;
  gradient: string;
  images?: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "airflow",
    title: "Airflow",
    description: "Stunning 3D visualization and animation project showcasing fluid dynamics and motion design.",
    category: "3d",
    liveUrl: "https://airflow.cybiqon.in",
    tags: ["3D", "Animation", "Visual Design"],
    featured: true,
    gradient: "from-cyan-500 to-blue-600",
    images: [
      "/portfolio/airflow1.png",
      "/portfolio/airflow2.png",
      "/portfolio/airflow3.png",
    ],
  },
  {
    id: "coffeehub",
    title: "CoffeeHub",
    description: "Modern coffee shop website with online ordering and loyalty program integration.",
    category: "websites",
    liveUrl: "https://coffeehub.cybiqon.in",
    tags: ["React", "E-commerce", "Responsive"],
    featured: true,
    gradient: "from-amber-500 to-orange-600",
    images: [
      "/portfolio/coffeehub1.png",
      "/portfolio/coffeehub2.png",
      "/portfolio/coffeehub3.png",
    ],
  },
  {
    id: "torquex",
    title: "TorqueX",
    description: "Automotive service center website with appointment booking and service catalog.",
    category: "websites",
    liveUrl: "https://torquex.cybiqon.in",
    tags: ["React", "Booking System", "SEO"],
    featured: true,
    gradient: "from-blue-600 to-indigo-700",
    images: [
      "/portfolio/torquex1.png",
      "/portfolio/torquex2.png",
      "/portfolio/torquex3.png",
    ],
  },
  {
    id: "freshcart",
    title: "FreshCart",
    description: "Grocery delivery platform with real-time inventory and checkout experience.",
    category: "websites",
    liveUrl: "https://freshcart.cybiqon.in",
    tags: ["React", "E-commerce", "Mobile-First"],
    featured: false,
    gradient: "from-emerald-500 to-teal-600",
    images: [
      "/portfolio/freshcart1.png",
      "/portfolio/freshcart2.png",
      "/portfolio/freshcart3.png",
    ],
  },
  {
    id: "leadzgalaxy",
    title: "LeadzGalaxy",
    description: "Chrome extension for lead generation and contact extraction from LinkedIn profiles.",
    category: "extensions",
    liveUrl: "https://chromewebstore.google.com/detail/leadzgalaxy/hhgapdnijdkgnckbjdmmlfcopgdffpep",
    tags: ["Chrome Extension", "Lead Gen", "Automation"],
    featured: true,
    gradient: "from-purple-500 to-pink-600",
    images: [
      "/portfolio/cr1.png",
      "/portfolio/cr2.png",
      "/portfolio/cr3.png",
    ],
  },
];

const categories: { id: Category; label: string; icon: typeof Globe }[] = [
  { id: "all", label: "All", icon: Filter },
  { id: "3d", label: "3D", icon: Box },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "extensions", label: "Extensions", icon: Puzzle },
];

const OurWorks = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Our Works', item: 'https://cybiqon.in/our-works' },
    ],
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Works - Cybiqon AI Portfolio',
    description: 'Showcase of websites, apps, and Chrome extensions built by Cybiqon AI Solutions',
    provider: { '@type': 'Organization', name: 'Cybiqon AI Solutions' },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              Portfolio
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              See what we&apos;ve <span className="text-primary">built</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Websites, apps, and tools we&apos;ve created for businesses just like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-6">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-14 md:pb-18" ref={gridRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} isVisible={gridVisible} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                No projects found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-14 bg-primary">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
                Want something like this?
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-md">
                Book a free 30-minute consultation and let&apos;s discuss your project.
              </p>
            </div>
            <Button
              onClick={handleBookCall}
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-6 py-4 flex-shrink-0"
            >
              Book a call <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Portfolio Card ─── */

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  isVisible: boolean;
}

const PortfolioCard = ({ item, index, isVisible }: PortfolioCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = item.images && item.images.length > 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? item.images!.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setCurrentImageIndex((prev) => (prev === item.images!.length - 1 ? 0 : prev + 1));
    }
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case "websites": return <Globe className="w-3 h-3" />;
      case "extensions": return <Puzzle className="w-3 h-3" />;
      case "3d": return <Box className="w-3 h-3" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  const getCategoryLabel = () => {
    switch (item.category) {
      case "websites": return "Website";
      case "extensions": return "Extension";
      case "3d": return "3D";
      default: return item.category;
    }
  };

  return (
    <a
      href={item.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group border border-border bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 block reveal ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {hasImages ? (
          <>
            <div className="absolute inset-0">
              {item.images!.map((image, imgIndex) => (
                <img
                  key={image}
                  src={image}
                  alt={`${item.title} screenshot ${imgIndex + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                />
              ))}
            </div>

            {item.images!.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
                  {item.images!.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        dotIndex === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                {item.category === "websites" ? (
                  <Globe className="w-10 h-10 mx-auto mb-1 opacity-40" />
                ) : item.category === "3d" ? (
                  <Box className="w-10 h-10 mx-auto mb-1 opacity-40" />
                ) : (
                  <Puzzle className="w-10 h-10 mx-auto mb-1 opacity-40" />
                )}
                <p className="text-xs font-medium opacity-60">{item.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start z-10">
          <Badge variant="secondary" className="bg-white/90 text-gray-700 gap-1 text-[11px] px-2 py-0.5">
            {getCategoryIcon()}
            {getCategoryLabel()}
          </Badge>
          {item.featured && (
            <Badge className="bg-amber-500 text-white hover:bg-amber-600 text-[11px] px-2 py-0.5">
              Featured
            </Badge>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 text-white text-xs font-medium">
            <ExternalLink className="w-4 h-4" />
            <span>View live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
          View live site
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
};

export default OurWorks;
