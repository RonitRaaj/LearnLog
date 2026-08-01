import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex w-full max-w-xl items-center  rounded-sm bg-[#F1F1F1] px-8 py-4">
      <MagnifyingGlass size={20} weight="bold" className="mr-1 text-zinc-500" />

      <input
        type="text"
        value={value}
        placeholder="Search your knowledge base..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-500"
      />
    </div>
  );
}
