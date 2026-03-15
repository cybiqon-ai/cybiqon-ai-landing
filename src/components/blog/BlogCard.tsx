import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import TagPill from "./TagPill";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
}

const BlogCard = ({ slug, title, excerpt, image_url, tags, created_at }: BlogCardProps) => {
  const tagList = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = new Date(created_at);

  return (
    <Link to={`/blog/${slug}`} className="group block">
      <article className="glass-card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          {image_url ? (
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-4xl font-heading font-bold gradient-text">C</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags */}
          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tagList.slice(0, 3).map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold font-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {excerpt}
          </p>

          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={date.toISOString()}>
              {format(date, "MMM d, yyyy")}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
