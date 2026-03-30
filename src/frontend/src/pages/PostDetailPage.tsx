import { Link, useParams } from "@tanstack/react-router";
import PostCard from "../components/PostCard";
import { useGetPost, useGetPosts } from "../hooks/useQueries";

const LOADING_KEYS = ["ld0", "ld1", "ld2", "ld3", "ld4"];

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: post, isLoading } = useGetPost(id ?? "");
  const { data: relatedData } = useGetPosts(
    1,
    3,
    post?.category ?? null,
    null,
    "newest",
  );
  const related =
    relatedData?.posts.filter((p) => p.id !== id).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <main>
        <div className="bp-post-header" />
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {LOADING_KEYS.map((k, i) => (
                <div
                  key={k}
                  className="bp-skeleton mb-3"
                  style={{
                    height: i === 0 ? 40 : 16,
                    width: i % 2 === 0 ? "80%" : "100%",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <div
          className="container py-5 text-center"
          data-ocid="post.error_state"
        >
          <h2 style={{ color: "var(--bp-navy)" }}>Post Not Found</h2>
          <p style={{ color: "var(--bp-muted)" }}>
            The post you&#39;re looking for doesn&#39;t exist.
          </p>
          <Link
            to="/"
            search={{}}
            className="bp-btn-hero mt-3"
            data-ocid="post.link"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = post.content
    .split("\n")
    .filter((p) => p.trim().length > 0);

  return (
    <main>
      {/* Post header */}
      <header className="bp-post-header">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="bp-post-header-bg"
        />
        <div
          className="container py-4"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Link
                to="/"
                search={{}}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: "1rem",
                }}
                data-ocid="post.link"
              >
                ← Back to Blog
              </Link>
              <div className="bp-badge-cat">{post.category}</div>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  marginBottom: "1rem",
                }}
              >
                {post.title}
              </h1>
              <div className="d-flex align-items-center gap-3">
                <img
                  src={
                    post.authorAvatar ||
                    `https://picsum.photos/seed/avatar-${post.author}/40/40`
                  }
                  alt={post.author}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                />
                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {post.author}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.78rem",
                    }}
                  >
                    {formatDate(post.date)}
                  </div>
                </div>
                <div
                  className="ms-3 d-flex gap-3"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.78rem",
                  }}
                >
                  <span>👁 {post.viewCount.toString()}</span>
                  <span>💬 {post.commentCount.toString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Post body */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="d-flex gap-2 flex-wrap mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="bp-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Excerpt */}
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--bp-muted)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                borderLeft: "3px solid var(--bp-teal)",
                paddingLeft: "1.1rem",
                fontStyle: "italic",
              }}
            >
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="bp-post-content">
              {paragraphs.map((para, i) => (
                <p key={`${post.id}-p${i}`}>{para}</p>
              ))}
            </div>

            {/* Back button */}
            <div
              className="mt-5 pt-3"
              style={{ borderTop: "1px solid var(--bp-border)" }}
            >
              <Link
                to="/"
                search={{}}
                className="bp-btn-hero"
                data-ocid="post.link"
              >
                ← Back to All Posts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ background: "#f8fafc", padding: "3rem 0" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "var(--bp-navy)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Related Articles
            </h2>
            <div className="row g-3">
              {related.map((rp, i) => (
                <div key={rp.id} className="col-md-4">
                  <PostCard post={rp} index={i + 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
