import axios from 'axios';

export default {
    
  listCartItems() {
    return axios.get('/cart');
  },
   addCartItem(id) {
    const productObj= {
      productId: id,
      quantity: 1,
    }; 
    return axios.post('/cart/items', productObj);
  },
  
  removeCartItem(cartItemId) {
    const productObj= {
      productId: cartItemId,
      quantity: 1,
    }; 
    return axios.delete(`/cart/items/${cartItemId}`, productObj);
  },

  clearCart() {
    return axios.delete('/cart');
  },
}