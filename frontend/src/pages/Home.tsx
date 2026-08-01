import { useEffect, useState } from "react";

import EntryCard from "../components/EntryCard";
import EntryForm from "../components/EntryForm";
import SearchBar from "../components/SearchBox";

import { PlusIcon } from "@phosphor-icons/react";

import { deleteEntry, getEntries } from "../services/Api";

import type { Entry } from "../types/entry";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    ...new Set(
      entries
        .map((entry) => entry.category)
        .filter(Boolean)
    ),
  ];

  const filteredEntries = entries.filter((entry) => {
    const query = search.toLowerCase();

    const matchesSearch =
      entry.term.toLowerCase().includes(query) ||
      entry.meaning.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "" ||
      entry.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    await deleteEntry(id);

    setEntries((previous) =>
      previous.filter((entry) => entry.id !== id)
    );
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getEntries();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <header className="mb-4 flex items-center justify-between gap-8">
          <h1 className="heading text-5xl font-black text-[#ff1d15]">
            LEARNLOG.
          </h1>

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-sm bg-[#ff1d15] px-10 py-5 text-lg font-bold text-white"
          >
            <PlusIcon size={22} />
            <span className="heading">
              ADD NEW LOG
            </span>
          </button>
        </header>

        <div className="mb-12 flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategory("")}
            className={`rounded-full px-8 py-3 font-bold transition ${
              selectedCategory === ""
                ? "bg-[#ff1d15] text-white"
                : "bg-[#FFE1CA]"
            }`}
          >
            ALL
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category!)
              }
              className={`rounded-full uppercase px-6 py-3 font-bold transition ${
                selectedCategory === category
                  ? "bg-[#ff1d15] text-white"
                  : "bg-[#FFE1CA]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="mb-8">
            <EntryForm />
          </div>
        )}

        {filteredEntries.length === 0 ? (
          <div className="rounded-xl bg-[#fbf7f2] p-10 text-center">
            Nothing here yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="heading py-32 text-center text-5xl font-black">
        LIVE. LEARN. LOVE
      </footer>
    </div>
  );
}