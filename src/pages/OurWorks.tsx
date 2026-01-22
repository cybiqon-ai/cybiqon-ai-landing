import { useState, useMemo } from "react";
import {
  Globe,
  Puzzle,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

type Category = "all" | "websites" | "extensions";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: "websites" | "extensions";
  liveUrl: string;
  tags: string[];
  featured?: boolean;
  gradient: string;
  images?: string[];
}

const portfolioItems: PortfolioItem[] = [
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
    description: "Grocery delivery platform with real-time inventory and seamless checkout experience.",
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
  { id: "all", label: "All Projects", icon: Filter },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "extensions", label: "Chrome Extensions", icon: Puzzle },
];

const OurWorks = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cybiqon.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Our Works',
        item: 'https://cybiqon.in/our-works'
      }
    ]
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Works - Cybiqon AI Portfolio',
    description: 'Showcase of websites, apps, and Chrome extensions built by Cybiqon AI Solutions',
    provider: {
      '@type': 'Organization',
      name: 'Cybiqon AI Solutions'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Works - Portfolio of Websites & Apps | Cybiqon AI"
        description="Explore our portfolio of professional websites, web applications, and Chrome extensions. See real examples of our work for businesses across India."
        canonical="/our-works"
        keywords="web development portfolio, website examples, Chrome extensions, React websites, business websites India, Cybiqon projects"
        structuredData={[breadcrumbSchema, portfolioSchema]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-4 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              Our Portfolio
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading mb-4">
              See What <span className="gradient-text">We've Built</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Showcase of websites, apps, and designs we've created for businesses just like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="pb-6 px-4 sm:px-6 lg:px-8">
        <div className="content-container">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 border-2
                    ${isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                      : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding pb-12">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Want Something <span className="gradient-text">Like This?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project and create something amazing together.
              Book a free 30-minute consultation to get started.
            </p>
            <Button
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Book a Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = item.images && item.images.length > 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? item.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setCurrentImageIndex((prev) =>
        prev === item.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case "websites":
        return <Globe className="w-4 h-4" />;
      case "extensions":
        return <Puzzle className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = () => {
    switch (item.category) {
      case "websites":
        return "Website";
      case "extensions":
        return "Extension";
      default:
        return item.category;
    }
  };

  return (
    <a
      href={item.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image/Placeholder Area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {hasImages ? (
          <>
            {/* Actual Images Carousel */}
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

            {/* Carousel Arrow Buttons */}
            {item.images!.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {item.images!.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        dotIndex === currentImageIndex
                          ? "bg-white w-4"
                          : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* Gradient Placeholder for items without images */
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                {item.category === "websites" ? (
                  <Globe className="w-16 h-16 mx-auto mb-2 opacity-50" />
                ) : (
                  <Puzzle className="w-16 h-16 mx-auto mb-2 opacity-50" />
                )}
                <p className="text-sm font-medium opacity-75">{item.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <Badge variant="secondary" className="bg-white/90 text-gray-700 gap-1.5">
            {getCategoryIcon()}
            {getCategoryLabel()}
          </Badge>
          {item.featured && (
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">
              Featured
            </Badge>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-white font-medium">
            <ExternalLink className="w-5 h-5" />
            <span>View Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          View Live Site
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

export default OurWorks;
