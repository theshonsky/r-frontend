import axios from "axios";

const productsController = {
  async getProducts(currentPage) {
    return await axios.get(`http://localhost:3000/products/?_page=${currentPage}&_limit=4`);
  },

  async sortAscProducts(currentPage) {
    return await axios.get(`http://localhost:3000/products/?_page=${currentPage}&_limit=4&_sort=price&_order=asc`);
  },

  async sortDescProducts(currentPage) {
    return await axios.get(`http://localhost:3000/products/?_page=${currentPage}&_limit=4&_sort=price&_order=desc`);
  },

  async getProduct(id) {
    return await axios.get(`http://localhost:3000/products/${id}`);
  },

  async createProduct(product) {
    return await axios.post("http://localhost:3000/products", product);
  },

  async updateProduct(id, product) {
    return await axios.put(`http://localhost:3000/products/${id}`, product);
  },

  async deleteProduct(id) {
    return await axios.delete(`http://localhost:3000/products/${id}`);
  },

};

export default productsController;
