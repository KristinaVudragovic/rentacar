import axios from 'axios';

const AUTOMOBIL_API_BASE_URL = "http://localhost:8083/automobil";

class AutomobilService {

    getAutomobile() {
        return axios.get(AUTOMOBIL_API_BASE_URL);
    }

    insertAutomobil(automobil) {
        return axios.post(AUTOMOBIL_API_BASE_URL, automobil);
    }

    getAutomobilById(id) {
        return axios.get(AUTOMOBIL_API_BASE_URL + '/' + id);
    }

    updateAutomobil(automobil, id) {
        return axios.put(AUTOMOBIL_API_BASE_URL + '/' + id, automobil);
    }

    deleteAutomobil(id) {
        return axios.delete(AUTOMOBIL_API_BASE_URL + '/' + id);
    }

}

export default new AutomobilService();