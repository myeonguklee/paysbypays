'use client';

interface ReadOnlyFieldProps {
  label: string;
  value?: string | React.ReactNode;
}

export const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps) => {
  const displayValue = value ?? '-';

  return (
    <div className="flex flex-row items-center gap-1">
      <label className="w-32 text-sm font-medium text-gray-500">{label}</label>
      <span className="flex-1 text-sm text-gray-900">{displayValue}</span>
    </div>
  );
};
