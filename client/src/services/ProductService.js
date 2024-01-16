import axios from 'axios';

export default {
  list() {
    return axios.get('/products');
  },
  productById(id){
    return axios.get(`/products/${id}`);
  },
  searchProducts(searchString) {
    return axios.get('/products/?name=' + searchString);
  },
}