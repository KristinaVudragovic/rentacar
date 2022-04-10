import axios from 'axios';

const FAKTURA_API_BASE_URL = "http://localhost:8083/faktura";

class FakturaService {

    getFakture() {
        return axios.get(FAKTURA_API_BASE_URL);
    }

    insertFaktura(faktura) {
        return axios.post(FAKTURA_API_BASE_URL, faktura);
    }

    getFakturaById(id) {
        return axios.get(FAKTURA_API_BASE_URL + '/' + id);
    }

    updateFaktura(faktura, id) {
        return axios.put(FAKTURA_API_BASE_URL + '/' + id, faktura);
    }

}

export default new FakturaService();