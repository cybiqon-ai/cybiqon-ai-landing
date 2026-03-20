interface TagPillProps {
  tag: string;
}

const TagPill = ({ tag }: TagPillProps) => {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
      {tag}
    </span>
  );
};

export default TagPill;
