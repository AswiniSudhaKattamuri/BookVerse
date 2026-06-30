import "./Sidebar.css";

function Sidebar({ filters, setFilters }) {

  const categories = [
  { icon: "💕", name: "Romance" },
  { icon: "❤️", name: "Romantic Thriller" },
  { icon: "🔪", name: "Thriller" },
  { icon: "🕵️", name: "Mystery" },
  { icon: "👻", name: "Horror" },
  { icon: "🧙", name: "Fantasy" },
  { icon: "🚀", name: "Science Fiction" },
  { icon: "🌱", name: "Self Help" },
  { icon: "💼", name: "Business" },
  { icon: "💰", name: "Finance" },
  { icon: "👤", name: "Biography" },
  { icon: "📖", name: "Classic" },
];

  return (
    <div className="sidebar">

      <h2>📚 Filters</h2>

      <div className="filter-section">

        <h3>🔍 Search</h3>

        <input
  type="text"
  placeholder="Search books..."
  value={filters.search}
  onChange={(e) =>
    setFilters({
      ...filters,
      search: e.target.value,
    })
  }
  style={{
    width: "100%",
    height: "45px",
    padding: "12px 15px",
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "16px",
    display: "block",
  }}
/>

      </div>

      <div className="filter-section">

        <h3>📚 Category</h3>

        <div className="category-list">

  {categories.map((category) => (

    <div
      key={category.name}
      className={`category-card ${
        filters.category === category.name
          ? "active-category"
          : ""
      }`}
      onClick={() =>
        setFilters({
          ...filters,
          category:
            filters.category === category.name
              ? ""
              : category.name,
        })
      }
    >
      <span>{category.icon}</span>

      <p>{category.name}</p>
    </div>

  ))}

</div>

      </div>

    <div className="filter-section">

  <h3>💰 Price</h3>

  <div className="price-list">

    <div
      className={`price-card ${
        filters.maxPrice == 200 ? "active-price" : ""
      }`}
      onClick={() =>
        setFilters({
          ...filters,
          minPrice: "",
          maxPrice: 200,
        })
      }
    >
      💸 Under ₹200
    </div>

    <div
      className={`price-card ${
        filters.minPrice == 200 ? "active-price" : ""
      }`}
      onClick={() =>
        setFilters({
          ...filters,
          minPrice: 200,
          maxPrice: 350,
        })
      }
    >
      💰 ₹200 - ₹350
    </div>

    <div
      className={`price-card ${
        filters.minPrice == 350 ? "active-price" : ""
      }`}
      onClick={() =>
        setFilters({
          ...filters,
          minPrice: 350,
          maxPrice: "",
        })
      }
    >
      💎 Above ₹350
    </div>

  </div>

</div>
<button
  className="clear-btn"
  onClick={() =>
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    })
  }
>
  🗑 Reset Filters
</button>

    </div>
  );
}

export default Sidebar;