import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import TagPill from "./TagPill";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
  index?: number;
}

const cardStyles = [
  "border border-border bg-white rounded-xl",
  "glass-card",
  "warm-card",
];

const BlogCard = ({ slug, title, excerpt, image_url, tags, created_at, index = 0 }: BlogCardProps) => {
  const tagList = tags ? tags.split(",").map((t) => t.trim()).filter((t) => t && !/["\[\]{}()]/.test(t)) : [];
  const date = new Date(created_at);
  const style = cardStyles[index % cardStyles.length];

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className={`${style} overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}>
        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
          {image_url ? (
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-3xl font-extrabold text-primary/30">C</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="text-white text-xs font-medium flex items-center gap-1.5">
              Read article <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tagList.slice(0, 3).map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}
          <h3 className="text-sm font-bold mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">{excerpt}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <time dateTime={date.toISOString()}>{format(date, "MMM d, yyyy")}</time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
