import Navbar from "../components/Navbar";
import productsController from "../controller/products";
import { useEffect } from "react";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, status } = await productsController.getProducts();
    alert(status);
    console.log(data);
    setProducts(data);
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <button onClick={fetchProducts}>fetch products</button>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((product) => <h1 key={product.id}>{product.title}</h1>)
      )}
    </div>
  );
};

export default Products;
