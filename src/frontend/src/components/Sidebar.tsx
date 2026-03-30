import { Link } from "@tanstack/react-router";
import { useGetRecentPosts, useGetTags } from "../hooks/useQueries";
import AjaxSearch from "./AjaxSearch";
import CategoryFilter from "./CategoryFilter";

interface Props {
  selectedCategory: string | null;
  onCategorySelect: (cat: string | null) => void;
  onSearch: (query: string) => void;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Sidebar({
  selectedCategory,
  onCategorySelect,
  onSearch,
}: Props) {
  const { data: recentPosts = [] } = useGetRecentPosts(5);
  const { data: tags = [] } = useGetTags();

  return (
    <aside>
      {/* AJAX Search */}
      <div className="bp-widget">
        <div className="bp-widget-title">Search</div>
        <AjaxSearch onSearch={onSearch} />
      </div>

      {/* Categories */}
      <div className="bp-widget">
        <div className="bp-widget-title">Categories</div>
        <CategoryFilter
          selected={selectedCategory}
          onSelect={onCategorySelect}
        />
      </div>

      {/* Recent Posts */}
      <div className="bp-widget">
        <div className="bp-widget-title">Recent Posts</div>
        {recentPosts.length === 0 ? (
          <div style={{ fontSize: "0.85rem", color: "var(--bp-muted)" }}>
            Loading…
          </div>
        ) : (
          recentPosts.map((post) => (
            <Link
              key={post.id}
              to="/post/$id"
              params={{ id: post.id }}
              className="bp-recent-post"
            >
              <img
                src={
                  post.imageUrl || `https://picsum.photos/seed/${post.id}/60/50`
                }
                alt={post.title}
                className="bp-recent-thumb"
              />
              <div>
                <div className="bp-recent-title">{post.title}</div>
                <div className="bp-recent-date">{formatDate(post.date)}</div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Tags */}
      <div className="bp-widget">
        <div className="bp-widget-title">Popular Tags</div>
        <div style={{ marginTop: "0.25rem" }}>
          {tags.length === 0 ? (
            <div style={{ fontSize: "0.85rem", color: "var(--bp-muted)" }}>
              Loading…
            </div>
          ) : (
            tags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                type="button"
                className="bp-tag border-0"
                onClick={() => onSearch(tag)}
                data-ocid="tags.toggle"
              >
                {tag}
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
