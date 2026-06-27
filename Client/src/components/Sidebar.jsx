import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>📚 Filters</h2>

      <div className="filter-section">
        <h3>Category</h3>
        <label><input type="checkbox" /> Romance</label>
        <label><input type="checkbox" /> Thriller</label>
        <label><input type="checkbox" /> Mystery</label>
      </div>

      <div className="filter-section">
        <h3>Price</h3>
        <label><input type="radio" name="price" /> Under ₹300</label>
        <label><input type="radio" name="price" /> ₹300 - ₹500</label>
        <label><input type="radio" name="price" /> Above ₹500</label>
      </div>

      <button className="clear-btn">Clear Filters</button>
    </div>
  );
}

export default Sidebar;