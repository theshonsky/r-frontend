import Card from "../components/Card/Card";
import Navbar from "../components/Navbar";
import productsController from "../controller/products";
import { useEffect } from "react";
import { useState } from "react";

let currentPage = 1
let type = false

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    if(type == 'asc'){
      const { data } = await productsController.sortAscProducts(currentPage);
      setProducts(data);
      setLoading(false);
    }else if(type == 'desc'){
      const { data } = await productsController.sortDescProducts(currentPage);
      setProducts(data);
      setLoading(false);
    }else{
      const { data } = await productsController.getProducts(currentPage);
      setProducts(data);
      setLoading(false);
    }
    
  };

  const nextPage = () =>{
    currentPage++;
    fetchProducts();
  }

  const previousPage = () =>{
    if(currentPage>1){
      currentPage--;
      fetchProducts();
    }
  }

  const sortAsc = () =>{
    type = 'asc'
    currentPage = 1
    fetchProducts();
  }

  const sortDesc = () =>{
    type = 'desc'
    currentPage = 1
    fetchProducts();
  }

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <button onClick={previousPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
      <button onClick={sortAsc}>Sort by asc</button>
      <button onClick={sortDesc}>Sort by desc</button>
      <h2>Page: {currentPage}</h2>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((p) => <Card key={p.id} product={p} />)
      )}
      <button onClick={previousPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Products;
