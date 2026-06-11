export default function RecentOrders() {
  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#0f172a",
        padding: "20px",
        borderRadius: "15px",
        color: "white",
        marginTop: "20px",
      }}
    >
      <h3>Recent Orders</h3>

      {recentOrders.length === 0 ? (
        <p>No Orders Available</p>
      ) : (
        recentOrders.map((order: any) => (
          <div
            key={order.id}
            style={{
              marginTop: "15px",
              paddingBottom: "10px",
              borderBottom:
                "1px solid #334155",
            }}
          >
            <strong>
              {order.customer}
            </strong>

            <p>{order.product}</p>

            <p>₹{order.amount}</p>
          </div>
        ))
      )}
    </div>
  );
}