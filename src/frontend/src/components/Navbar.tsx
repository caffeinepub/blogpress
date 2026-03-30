import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

export default function Navbar() {
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" as const, search: {} },
    { label: "Articles", to: "/" as const, search: { cat: "articles" } },
    { label: "Tutorials", to: "/" as const, search: { cat: "tutorials" } },
    { label: "Reviews", to: "/" as const, search: { cat: "reviews" } },
    { label: "Resources", to: "/" as const, search: { cat: "resources" } },
    { label: "About", to: "/" as const, search: {} },
  ];

  return (
    <nav className="bp-navbar sticky-top" style={{ zIndex: 1030 }}>
      <div className="container">
        <div className="d-flex align-items-center py-2 gap-3">
          {/* Logo */}
          <Link
            to="/"
            search={{}}
            className="bp-logo-text me-4"
            data-ocid="nav.link"
          >
            <span>Blog</span>Press
          </Link>

          {/* Desktop nav */}
          <div className="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={link.search}
                data-ocid="nav.link"
                className={`bp-navbar nav-link${
                  isHome && link.label === "Home" ? " active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: search + subscribe */}
          <div className="d-none d-lg-flex align-items-center gap-2 ms-auto">
            <div className="bp-search-wrapper" style={{ width: 200 }}>
              <input
                type="text"
                placeholder="Search..."
                className="bp-search-input"
                data-ocid="nav.search_input"
              />
            </div>
            <button
              type="button"
              className="bp-btn-subscribe"
              data-ocid="nav.primary_button"
            >
              Subscribe
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="btn d-lg-none ms-auto p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="d-lg-none pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={link.search}
                className="bp-navbar nav-link d-block"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
