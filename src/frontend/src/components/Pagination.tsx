interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis-start");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis-end");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" data-ocid="pagination.panel">
      <div className="bp-pagination">
        <button
          type="button"
          className="bp-page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          data-ocid="pagination.pagination_prev"
          aria-label="Previous"
        >
          ‹ Prev
        </button>

        {pages.map((p) =>
          typeof p === "string" ? (
            <span
              key={p}
              style={{ padding: "0 0.3rem", color: "var(--bp-muted)" }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`bp-page-btn${p === currentPage ? " active" : ""}`}
              onClick={() => onPageChange(p)}
              data-ocid={`pagination.item.${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          className="bp-page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          data-ocid="pagination.pagination_next"
          aria-label="Next"
        >
          Next ›
        </button>
      </div>
    </nav>
  );
}
