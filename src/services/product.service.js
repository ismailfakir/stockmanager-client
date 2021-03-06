import axios from 'axios';
import authHeader from './auth-header';
import Product from '../models/product';

const API_URL_PRODUCTS = 'http://localhost:9080/api/products';
const emptyProduct = Product.empty();

class ProductService {

    getProducts() {
        return axios.get(API_URL_PRODUCTS, { headers: authHeader() });
    }

    postProduct(product) {
        const newProduct = Object.assign(emptyProduct, product);
        return axios.post(API_URL_PRODUCTS, newProduct, { headers: authHeader() });
    }

    putProduct(id,product) {
        const newProduct = Object.assign(emptyProduct, product);
        return axios.put(API_URL_PRODUCTS + '/' + id, newProduct, { headers: authHeader() });
    }

    deleteProduct(id) {

        return axios.delete(API_URL_PRODUCTS + '/' + id, { headers: authHeader() });
    }


}

export default new ProductService();
