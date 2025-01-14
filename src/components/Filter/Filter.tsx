interface FilterProps {
  filterValue: string;
  onFilterChange: (text: string) => void;
}

function Filter({ filterValue, onFilterChange }: FilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <label className="flex gap-x-2 items-baseline">
      <input
        className="mt-1 block min-w-[340px] text-md font-medium rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={filterValue || ""}
        onChange={(e) => handleChange(e)}
        placeholder="Search by name or email..."
      />
    </label>
  );
}

export default Filter;
