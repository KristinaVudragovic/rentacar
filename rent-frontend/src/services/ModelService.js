import axios from 'axios';

const MODEL_API_BASE_URL = "http://localhost:8083/model";

class ModelService {

    getModele() {
        return axios.get(MODEL_API_BASE_URL);
    }

    insertModel(model) {
        return axios.post(MODEL_API_BASE_URL, model);
    }

    getModelById(id) {
        return axios.get(MODEL_API_BASE_URL + '/' + id);
    }

    updateModel(model, id) {
        return axios.put(MODEL_API_BASE_URL + '/' + id, model);
    }

    deleteModel(id) {
        return axios.delete(MODEL_API_BASE_URL + '/' + id);
    }

}

export default new ModelService();