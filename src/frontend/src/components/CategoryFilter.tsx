import { useGetCategories } from "../hooks/useQueries";

interface Props {
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  const { data: categories = [] } = useGetCategories();

  return (
    <div data-ocid="sidebar.panel">
      <button
        type="button"
        className={`bp-cat-item w-100 bg-transparent border-0 text-start${!selected ? " active" : ""}`}
        onClick={() => onSelect(null)}
        data-ocid="categories.tab"
      >
        <span>All Posts</span>
        <span className="bp-cat-count">All</span>
      </button>
      {categories.map((cat, i) => (
        <button
          key={cat.id}
          type="button"
          className={`bp-cat-item w-100 bg-transparent border-0 text-start${selected === cat.name ? " active" : ""}`}
          onClick={() => onSelect(selected === cat.name ? null : cat.name)}
          data-ocid={`categories.tab.${i + 1}`}
        >
          <span>{cat.name}</span>
          <span className="bp-cat-count">{cat.postCount.toString()}</span>
        </button>
      ))}
    </div>
  );
}
