import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL + 'api/products', { headers: authHeader() });
  }

  getProducts() {
    return axios.get(API_URL + 'api/products', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
