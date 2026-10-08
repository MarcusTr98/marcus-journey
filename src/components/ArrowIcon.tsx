type ArrowDirection = "external" | "right" | "down" | "up";

const paths: Record<ArrowDirection, string> = {
  external: "M8 16 16 8M9 8h7v7",
  right: "M7 12h10m-4-4 4 4-4 4",
  down: "M12 7v10m-4-4 4 4 4-4",
  up: "M12 17V7m-4 4 4-4 4 4",
};

export default function ArrowIcon({
  direction = "external",
  className,
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className ? `circle-arrow ${className}` : "circle-arrow"}
      viewBox="0 0 24 24"
      fill="none"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <path d={paths[direction]} />
    </svg>
  );
}
