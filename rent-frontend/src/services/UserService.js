import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8083/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'korisnik', { headers: authHeader() });
  }

  getZaposleniBoard() {
    return axios.get(API_URL + 'zaposleni', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'administrator', { headers: authHeader() });
  }
}

export default new UserService();