import Card from "../components/Card/Card";
import Navbar from "../components/Navbar";
import productsController from "../controller/products";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { paramsToObject } from "../utils/routerUtils";
import Pagination from "../components/Pagination/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const [productTotalCount, setProductTotalCount] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const updateParams = (key, value) => {
    setParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(key, value);
      return params;
    });
  };

  let CategoryId = false

  const fetchProducts = async () => {
    if (CategoryId){
      setLoading(true);
      productsController.getProductByCategoty(CategoryId, paramsToObject(params)).then((res) => {
      setProductTotalCount(res.headers["x-total-count"]);
      setProducts(res.data);
      setLoading(false);
    });
    }else{
      setLoading(true);
      productsController.getProducts(paramsToObject(params)).then((res) => {
      setProductTotalCount(res.headers["x-total-count"]);
      setProducts(res.data);
      setLoading(false);
    });
  }
  };

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <input type="text" ref={searchRef} defaultValue={params.get("q") || ""} />
      <button onClick={() => updateParams("q", searchRef.current.value)}>Search</button>
      {params.get("q") ? <p>Result for {params.get("q")}</p> : null}
      <form>
      <label for="publisher">Choose publisher:</label>
        <select name="publisher" id="publisher">
          <option value="1">Nintendo</option>
          <option value="2">Pokemon</option>
          <option value="3">Capcom</option>
          <option value="4">From Software</option>
        </select>
        <button type="submit" value="Submit"/>
      </form>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((p) => <Card key={p.id} product={p} />)
      )}

      {productTotalCount ? (
        <Pagination
          totalPages={Math.ceil(productTotalCount / 10)}
          currentPage={parseInt(params.get("_page")) || 1}
          onPageChange={(page) => updateParams("_page", page)}
        />
      ) : null}
    </div>
  );
};

export default Products;
