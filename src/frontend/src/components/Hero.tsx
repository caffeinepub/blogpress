import { Link } from "@tanstack/react-router";

export default function Hero() {
  return (
    <section className="bp-hero">
      <img
        src="/assets/generated/hero-blog-bg.dim_1920x600.jpg"
        alt=""
        className="bp-hero-bg"
      />
      <div className="container bp-hero-content py-5">
        <div className="row">
          <div className="col-lg-7">
            <p
              className="mb-2"
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Featured Collection
            </p>
            <h1>
              Discover Ideas That
              <br />
              <em style={{ color: "#5eead4", fontStyle: "normal" }}>
                Inspire &amp; Inform
              </em>
            </h1>
            <p className="mt-3 mb-4">
              Explore in-depth articles, practical tutorials, honest reviews,
              and curated resources — all in one beautifully crafted magazine.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/" search={{}} className="bp-btn-hero">
                Start Reading →
              </Link>
              <a
                href="#posts"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  textDecoration: "none",
                  paddingTop: "0.7rem",
                }}
              >
                Browse Topics ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
