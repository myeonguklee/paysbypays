interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-12 text-center shadow-sm">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};
