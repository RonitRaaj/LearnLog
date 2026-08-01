import { useState } from "react";
import { createEntry } from "../services/Api";

export default function EntryForm() {
  const [term, setTerm] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("");
  const [example, setExample] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!term.trim() || !meaning.trim()) {
      return;
    }

    await createEntry({
      term,
      meaning,
      category,
      example,
    });

    setTerm("");
    setMeaning("");
    setCategory("");
    setExample("");
  };

  return (
    <div className="rounded-xl bg-[#fbf7f2] p-8 shadow-sm">
      <h2 className="heading mb-8 text-3xl font-black text-[#ff1d15]">
        ADD NEW LOG
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 outline-none transition focus:border-[#ff1d15]"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-5 py-4 outline-none transition focus:border-[#ff1d15]"
          />

          <input
            type="text"
            placeholder="Example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-5 py-4 outline-none transition focus:border-[#ff1d15]"
          />
        </div>

        <textarea
          placeholder="Description"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          rows={6}
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-5 py-4 outline-none transition focus:border-[#ff1d15]"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#ff1d15] px-8 py-4 font-bold text-white transition hover:scale-105"
          >
            + ADD NEW LOG
          </button>
        </div>
      </form>
    </div>
  );
}