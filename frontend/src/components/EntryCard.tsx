import type { Entry } from "../types/entry";

interface EntryCardProps {
  entry: Entry;
  onDelete: (id: string) => void;
}

export default function EntryCard({
  entry,
  onDelete,
}: EntryCardProps) {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();

        const shouldDelete = confirm(
          `Delete "${entry.term}"?`
        );

        if (shouldDelete) {
          onDelete(entry.id);
        }
      }}
      className="min-h-60 cursor-pointer rounded-sm bg-[#FFFAF5] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <h2 className="heading mb-2 text-5xl font-black uppercase leading-none text-zinc-900">
        {entry.term}
      </h2>

      {entry.category && (
        <span className="inline-block uppercase rounded-full bg-[#ff4d4d] px-5 py-2 text-sm font-semibold text-white">
          {entry.category}
        </span>
      )}

      <p className="mt-4 text-xl leading-tight text-zinc-800">
        {entry.meaning}
      </p>

      {entry.example && (
        <div className="mt-4">
          <p className="text-zinc-800 text-xl leading-tight mb-2">
            Example: {entry.example}
          </p>
        </div>
      )}
    </div>
  );
}