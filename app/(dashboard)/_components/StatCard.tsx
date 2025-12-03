interface StatCardProps {
  title: string;
  children: React.ReactNode;
}

export const StatCard = ({ title, children }: StatCardProps) => {
  return (
    <div className="col-span-1 flex min-h-40 flex-col gap-4 rounded-lg border border-gray-100 p-4 shadow-sm">
      <h3 className="text-lg text-gray-700">{title}</h3>
      <div className="flex grow flex-col gap-2">{children}</div>
    </div>
  );
};
