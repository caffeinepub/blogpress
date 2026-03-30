import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchSuggestions } from "../hooks/useQueries";

interface Props {
  onSearch?: (query: string) => void;
}

export default function AjaxSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((val: string) => {
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(val);
      setOpen(val.length > 1);
    }, 350);
  }, []);

  const { data: suggestions = [] } = useSearchSuggestions(debouncedQuery);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setOpen(false);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate({ to: "/", search: (prev) => ({ ...prev, q: suggestion }) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate({ to: "/", search: (prev) => ({ ...prev, q: query }) });
    }
  };

  return (
    <div className="bp-search-wrapper" ref={wrapperRef}>
      <form onSubmit={handleSubmit} data-ocid="search.input">
        <input
          type="text"
          className="bp-search-input"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.length > 1 && setOpen(true)}
          autoComplete="off"
          data-ocid="sidebar.search_input"
        />
      </form>
      {open && suggestions.length > 0 && (
        <div className="bp-search-dropdown" data-ocid="search.popover">
          {suggestions.map((s) => (
            <div
              key={s}
              className="bp-search-suggestion"
              onMouseDown={() => handleSelect(s)}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: 6, opacity: 0.5 }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
