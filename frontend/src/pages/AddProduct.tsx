import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !category || !stock || !price) {
      alert("Fill all fields");
      return;
    }

    const products = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const newProduct = {
      id: Date.now(),
      name,
      category,
      stock: Number(stock),
      price: Number(price),
    };

    localStorage.setItem(
      "products",
      JSON.stringify([...products, newProduct])
    );

    setName("");
    setCategory("");
    setStock("");
    setPrice("");

    alert("Product Added Successfully");
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        <h1>Add Product</h1>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "20px",
            maxWidth: "700px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            style={inputStyle}
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            style={inputStyle}
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
          />

          <input
            style={inputStyle}
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <button
            onClick={addProduct}
            style={buttonStyle}
          >
            Add Product
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};