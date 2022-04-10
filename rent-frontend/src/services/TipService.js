import axios from 'axios';

const TIP_API_BASE_URL = "http://localhost:8083/tip";

class TipService {
    
    getTipove() {
        return axios.get(TIP_API_BASE_URL);
    }

    insertTip(tip) {
        return axios.post(TIP_API_BASE_URL, tip);
    }

    getTipById(id) {
        return axios.get(TIP_API_BASE_URL + '/' + id);
    }

    updateTip(tip, id) {
        return axios.put(TIP_API_BASE_URL + '/' + id, tip);
    }

    deleteTip(id) {
        return axios.delete(TIP_API_BASE_URL + '/' + id);
    }

}

export default new TipService();