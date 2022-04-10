import axios from 'axios';

const MARKA_API_BASE_URL = "http://localhost:8083/marka";

class MarkaService {
    
    getMarke() {
        return axios.get(MARKA_API_BASE_URL);
    }

    insertMarka(marka) {
        return axios.post(MARKA_API_BASE_URL, marka);
    }

    getMarkaById(id) {
        return axios.get(MARKA_API_BASE_URL + '/' + id);
    }

    updateMarka(marka, id) {
        return axios.put(MARKA_API_BASE_URL + '/' + id, marka);
    }

    deleteMarka(id) {
        return axios.delete(MARKA_API_BASE_URL + '/' + id);
    }

}

export default new MarkaService();