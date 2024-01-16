import { createStore as _createStore } from 'vuex';
import axios from 'axios';
import ProductService from '../services/ProductService';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      token: currentToken || '',
      user: currentUser || {},
      searchTerm: '',
      products: [],
    },
    // getters: {
    //   GET_PRODUCTS(state) {
    //     state.products
    //   }
    // },
    mutations: {
      SET_AUTH_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      },
      SET_PRODUCTS(state, products) {
        state.products = products;
      }
    },
    // actions: {
    //   async FETCH_PRODUCTS ({ commit }) {
    //     const products = await ProductService.list()
    //   console.log('store', ProductService.list());
    //     commit('SET_PRODUCTS', products.data)
    //   }
      // FETCH_PRODUCTS(context) {
      //   try {
      //    let data = axios.get('/products');
      //     context.commit("SET_PRODUCTS", data.data)
      //   } catch (error) {
      //     this.isLoading = false;
      //     window.alert(`ERROR: ${error}`)
      //   }
      //   }
    // },

  });
return store;
}