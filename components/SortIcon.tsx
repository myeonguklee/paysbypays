import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

export type SortOrder = 'asc' | 'desc';

interface SortIconProps<T extends string> {
  field: T;
  currentField: T;
  order: SortOrder;
}

export const SortIcon = <T extends string>({
  field,
  currentField,
  order,
}: SortIconProps<T>) => {
  if (field !== currentField) {
    return <ArrowUpDownIcon className="size-4 text-gray-400" />;
  }

  return order === 'asc' ? (
    <ArrowUpIcon className="size-4 text-blue-600" />
  ) : (
    <ArrowDownIcon className="size-4 text-blue-600" />
  );
};
