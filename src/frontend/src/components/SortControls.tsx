interface Props {
  sortBy: string;
  onChange: (sort: string) => void;
  total?: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
];

export default function SortControls({ sortBy, onChange, total }: Props) {
  return (
    <div className="bp-results-bar">
      <div>
        <span className="bp-section-title">Latest Posts</span>
        {total !== undefined && (
          <span
            style={{
              marginLeft: "0.6rem",
              fontSize: "0.82rem",
              color: "var(--bp-muted)",
              fontWeight: 500,
            }}
          >
            ({total} articles)
          </span>
        )}
      </div>
      <div className="d-flex align-items-center gap-2">
        <label
          htmlFor="sort-select"
          style={{
            fontSize: "0.82rem",
            color: "var(--bp-muted)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Sort by:
        </label>
        <select
          id="sort-select"
          className="bp-sort-select"
          value={sortBy}
          onChange={(e) => onChange(e.target.value)}
          data-ocid="sort.select"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
