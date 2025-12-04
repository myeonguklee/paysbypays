export const SkeletonBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`animate-pulse rounded bg-gray-200 ${className || ''}`}
    {...props}
  />
);
