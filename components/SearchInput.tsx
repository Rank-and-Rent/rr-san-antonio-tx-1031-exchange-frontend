"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  placeholder?: string;
  onNoResults?: (query: string) => void;
  items: Array<{ slug: string; name: string; route: string }>;
  baseRoute?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  onNoResults,
  items,
  baseRoute,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredItems(items);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const exactMatches = items.filter(
      (item) => item.name.toLowerCase() === lowerQuery
    );
    const partialMatches = items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) &&
        item.name.toLowerCase() !== lowerQuery
    );

    const results = [...exactMatches, ...partialMatches].slice(0, 5);
    setFilteredItems(results);
    setIsOpen(results.length > 0 || query.trim() !== "");
  }, [query, items]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: { route: string }) => {
    router.push(item.route);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim() !== "") {
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0]);
      } else if (onNoResults) {
        onNoResults(query);
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 bg-paper border border-outline rounded-lg text-ink placeholder:text-ink/50 focus:outline-none focus:border-primary"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-paper border border-outline rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
          <ul className="py-2">
            {filteredItems.map((item) => (
              <li key={item.slug}>
                <button
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-2 hover:bg-panel text-ink transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && query.trim() !== "" && filteredItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-paper border border-outline rounded-lg shadow-xl z-50 p-4">
          <p className="text-ink mb-2">No results found for "{query}"</p>
          {onNoResults && (
            <button
              onClick={() => onNoResults(query)}
              className="text-primary hover:underline"
            >
              Contact us about "{query}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

