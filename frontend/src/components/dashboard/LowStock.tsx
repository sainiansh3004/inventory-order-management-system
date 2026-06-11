const products = [
  {
    name: "Laptop",
    stock: 4,
  },
  {
    name: "Keyboard",
    stock: 3,
  },
  {
    name: "Mouse",
    stock: 2,
  },
];

export default function LowStock() {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <h3>Low Stock Products</h3>

      {products.map((product) => (
        <div
          key={product.name}
          style={{
            marginTop: "15px",
          }}
        >
          <p>{product.name}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}