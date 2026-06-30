import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyOrders } from "../services/orderService";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.items.some((item) =>
      item.book.title.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      <Navbar />

      <div className="orders-container">

        {/* Left Sidebar */}

        <div className="orders-sidebar">

          <h2>Filters</h2>

          <div className="filter-section">

            <h3>ORDER STATUS</h3>

            <label>
              <input type="checkbox" />
              Processing
            </label>

            <label>
              <input type="checkbox" />
              Shipped
            </label>

            <label>
              <input type="checkbox" />
              Delivered
            </label>

          </div>

          <div className="filter-section">

            <h3>ORDER TIME</h3>

            <label>
              <input type="checkbox" />
              Last 30 Days
            </label>

            <label>
              <input type="checkbox" />
              2026
            </label>

            <label>
              <input type="checkbox" />
              Older
            </label>

          </div>

        </div>

        {/* Right */}

        <div className="orders-content">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search your orders..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {filteredOrders.length === 0 ? (

            <div className="empty-orders">

              No Orders Found

            </div>

          ) : (

            filteredOrders.map((order) => (

              <div
                className="order-card"
                key={order._id}
              >

                {order.items.map((item) => (

                  <div
                    className="order-item"
                    key={item.book._id}
                  >

                    <img
                      src={item.book.image}
                      alt={item.book.title}
                    />

                    <div className="book-info">

                      <h2>
                        {item.book.title}
                      </h2>

                      <p>
                        {item.book.author}
                      </p>

                      <span>
                        Qty : {item.quantity}
                      </span>

                    </div>

                    <div className="price">

                      ₹{item.book.price}

                    </div>

                    <div className="status">

                      <span className="status-dot"></span>

                      <div>

                        <h3>
                          {order.status}
                        </h3>

                        <p>
                          Ordered on{" "}
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}

export default Orders;