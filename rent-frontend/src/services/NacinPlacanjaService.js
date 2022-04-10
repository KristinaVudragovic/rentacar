import axios from 'axios';

const NACIN_PLACANJA_API_BASE_URL = "http://localhost:8083/nacinPlacanja";

class NacinPlacanjaService {

    getNacinePlacanja() {
        return axios.get(NACIN_PLACANJA_API_BASE_URL);
    }

    insertNacinPlacanja(nacinPlacanja) {
        return axios.post(NACIN_PLACANJA_API_BASE_URL, nacinPlacanja);
    }

    getNacinPlacanjaById(id) {
        return axios.get(NACIN_PLACANJA_API_BASE_URL + '/' + id);
    }

    updateNacinPlacanja(nacinPlacanja, id) {
        return axios.put(NACIN_PLACANJA_API_BASE_URL + '/' + id, nacinPlacanja);
    }

    deleteNacinPlacanja(id) {
        return axios.delete(NACIN_PLACANJA_API_BASE_URL + '/' + id);
    }

}

export default new NacinPlacanjaService()