import { Link } from "@tanstack/react-router";
import type { BlogPost } from "../backend.d";

interface Props {
  post: BlogPost;
  index?: number;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post, index = 1 }: Props) {
  return (
    <article className="bp-card" data-ocid={`posts.item.${index}`}>
      <Link to="/post/$id" params={{ id: post.id }}>
        <img
          src={post.imageUrl || `https://picsum.photos/seed/${post.id}/400/220`}
          alt={post.title}
          className="bp-card-img"
          loading="lazy"
        />
      </Link>
      <div className="bp-card-body">
        <span className="bp-card-category">{post.category}</span>
        <Link
          to="/post/$id"
          params={{ id: post.id }}
          className="bp-card-title d-block"
        >
          {post.title}
        </Link>
        <p className="bp-card-excerpt">{post.excerpt}</p>
        <div className="bp-card-meta">
          <div className="d-flex align-items-center">
            <img
              src={
                post.authorAvatar ||
                `https://picsum.photos/seed/avatar-${post.author}/40/40`
              }
              alt={post.author}
              className="bp-avatar"
            />
            <div>
              <div className="bp-meta-author">{post.author}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--bp-muted)" }}>
                {formatDate(post.date)}
              </div>
            </div>
          </div>
          <div className="bp-meta-comments d-flex align-items-center gap-1">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {post.commentCount.toString()}
          </div>
        </div>
      </div>
    </article>
  );
}
