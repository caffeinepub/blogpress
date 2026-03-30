const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/?cat=articles" },
  { label: "Tutorials", href: "/?cat=tutorials" },
  { label: "Reviews", href: "/?cat=reviews" },
  { label: "Resources", href: "/?cat=resources" },
  { label: "About", href: "/" },
];
const CAT_LINKS = [
  { label: "Technology", href: "/?cat=technology" },
  { label: "Design", href: "/?cat=design" },
  { label: "Development", href: "/?cat=development" },
  { label: "Business", href: "/?cat=business" },
  { label: "Science", href: "/?cat=science" },
  { label: "Culture", href: "/?cat=culture" },
];
const SOCIAL = [
  {
    net: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: "𝕏",
  },
  {
    net: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: "f",
  },
  {
    net: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: "◻",
  },
  { net: "github", label: "GitHub", href: "https://github.com", icon: "⌥" },
  {
    net: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "in",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bp-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4">
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "var(--bp-navy)",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ color: "var(--bp-teal)" }}>Blog</span>Press
            </div>
            <p
              style={{
                fontSize: "0.87rem",
                color: "var(--bp-muted)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              Your destination for insightful articles, practical tutorials, and
              in-depth reviews across technology, design, and modern culture.
            </p>
            <div className="d-flex gap-2 mt-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.net}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bp-social-btn"
                  aria-label={s.label}
                  data-ocid="footer.link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-sm-6 col-lg-2">
            <div className="bp-footer-title">Quick Links</div>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="bp-footer-link"
                data-ocid="footer.link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Categories */}
          <div className="col-sm-6 col-lg-2">
            <div className="bp-footer-title">Categories</div>
            {CAT_LINKS.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="bp-footer-link"
                data-ocid="footer.link"
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="col-lg-4">
            <div className="bp-footer-title">Newsletter</div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--bp-muted)",
                marginBottom: "0.75rem",
              }}
            >
              Get the best articles delivered to your inbox, every week.
            </p>
            <div className="d-flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bp-grid-search-input"
                style={{ flex: 1, fontSize: "0.85rem" }}
                data-ocid="newsletter.input"
              />
              <button
                type="button"
                className="bp-btn-search"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bp-footer-copy d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>© {year} BlogPress. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--bp-teal)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
