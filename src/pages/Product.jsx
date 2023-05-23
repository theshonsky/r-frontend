import Navbar from "../components/Navbar";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Navbar />
      <h1>Product #{id}</h1>
      <h2>Search Params: {searchParams.get("page")}</h2>
    </div>
  );
};

export default Product;
