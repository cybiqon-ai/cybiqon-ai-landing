interface TagPillProps {
  tag: string;
}

const TagPill = ({ tag }: TagPillProps) => {
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
      {tag}
    </span>
  );
};

export default TagPill;
