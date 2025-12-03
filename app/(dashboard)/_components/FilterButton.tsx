interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FilterButton = ({
  isActive,
  onClick,
  children,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1 text-sm ${isActive && 'bg-white'}`}
    >
      {children}
    </button>
  );
};
