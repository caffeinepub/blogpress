import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import PostGrid from "../components/PostGrid";
import Sidebar from "../components/Sidebar";
import SortControls from "../components/SortControls";
import { useGetPosts } from "../hooks/useQueries";

const PAGE_SIZE = 9;

export default function HomePage() {
  const search = useSearch({ strict: false }) as {
    cat?: string;
    q?: string;
  };
  const navigate = useNavigate();

  const selectedCategory = search.cat ?? null;
  const searchQuery = search.q ?? "";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [inputValue, setInputValue] = useState(searchQuery);

  const { data, isLoading } = useGetPosts(
    currentPage,
    PAGE_SIZE,
    selectedCategory,
    searchQuery || null,
    sortBy,
  );

  const posts = data?.posts ?? [];
  const total = Number(data?.total ?? 0);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleCategorySelect = (cat: string | null) => {
    setCurrentPage(1);
    navigate({
      to: "/",
      search: {
        cat: cat ?? undefined,
        q: searchQuery || undefined,
      },
    });
  };

  const handleSearch = (query: string) => {
    setInputValue(query);
    setCurrentPage(1);
    navigate({
      to: "/",
      search: {
        cat: selectedCategory ?? undefined,
        q: query || undefined,
      },
    });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  const activeFilters = [selectedCategory, searchQuery].filter(Boolean);

  return (
    <main>
      <Hero />

      <div className="container py-5" id="posts">
        <div className="row g-4">
          {/* Main content */}
          <div className="col-lg-8">
            {/* Search bar above grid */}
            <form
              onSubmit={handleSearchSubmit}
              className="bp-grid-search"
              data-ocid="search.panel"
            >
              <input
                type="text"
                className="bp-grid-search-input"
                placeholder="Search articles, tutorials, reviews..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                data-ocid="search.input"
              />
              <button
                type="submit"
                className="bp-btn-search"
                data-ocid="search.submit_button"
              >
                Search
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="bp-btn-search"
                  style={{ background: "var(--bp-muted)" }}
                  data-ocid="search.cancel_button"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="d-flex gap-2 flex-wrap mb-3">
                {selectedCategory && (
                  <button
                    type="button"
                    className="bp-tag border-0"
                    style={{
                      background: "rgba(14,165,164,0.12)",
                      color: "var(--bp-teal)",
                      borderColor: "var(--bp-teal)",
                    }}
                    onClick={() => handleCategorySelect(null)}
                    data-ocid="filter.toggle"
                  >
                    📁 {selectedCategory} ✕
                  </button>
                )}
                {searchQuery && (
                  <button
                    type="button"
                    className="bp-tag border-0"
                    style={{
                      background: "rgba(14,165,164,0.12)",
                      color: "var(--bp-teal)",
                      borderColor: "var(--bp-teal)",
                    }}
                    onClick={() => handleSearch("")}
                    data-ocid="filter.toggle"
                  >
                    🔍 &quot;{searchQuery}&quot; ✕
                  </button>
                )}
              </div>
            )}

            {/* Sort + total */}
            <SortControls
              sortBy={sortBy}
              onChange={handleSortChange}
              total={total}
            />

            {/* Post grid */}
            <PostGrid posts={posts} isLoading={isLoading} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
