import type { BlogPost } from "../backend.d";
import PostCard from "./PostCard";

interface Props {
  posts: BlogPost[];
  isLoading: boolean;
}

const SKELETON_KEYS = [
  "sk0",
  "sk1",
  "sk2",
  "sk3",
  "sk4",
  "sk5",
  "sk6",
  "sk7",
  "sk8",
];

function SkeletonCard() {
  return (
    <div className="bp-card">
      <div className="bp-skeleton" style={{ height: 185 }} />
      <div className="bp-card-body">
        <div className="bp-skeleton mb-2" style={{ height: 12, width: 70 }} />
        <div
          className="bp-skeleton mb-1"
          style={{ height: 18, width: "90%" }}
        />
        <div
          className="bp-skeleton mb-3"
          style={{ height: 18, width: "70%" }}
        />
        <div className="bp-skeleton" style={{ height: 12, width: "100%" }} />
        <div
          className="bp-skeleton mt-1"
          style={{ height: 12, width: "80%" }}
        />
      </div>
    </div>
  );
}

export default function PostGrid({ posts, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="row g-3" data-ocid="posts.loading_state">
        {SKELETON_KEYS.map((k) => (
          <div key={k} className="col-md-6 col-xl-4">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className="text-center py-5"
        data-ocid="posts.empty_state"
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid var(--bp-border)",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          style={{ marginBottom: 12 }}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <p style={{ color: "var(--bp-muted)", fontWeight: 600 }}>
          No posts found
        </p>
        <p style={{ color: "var(--bp-muted)", fontSize: "0.85rem" }}>
          Try adjusting your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {posts.map((post, i) => (
        <div key={post.id} className="col-md-6 col-xl-4">
          <PostCard post={post} index={i + 1} />
        </div>
      ))}
    </div>
  );
}
