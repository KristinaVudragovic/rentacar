import axios from 'axios';

const REZERVACIJA_API_BASE_URL = "http://localhost:8083/rezervacija";

class RezervacijaService {

    getRezervacije() {
        return axios.get(REZERVACIJA_API_BASE_URL);
    }

    insertRezervacija(rezervacija) {
        return axios.post(REZERVACIJA_API_BASE_URL, rezervacija);
    }

    getRezervacijaById(id) {
        return axios.get(REZERVACIJA_API_BASE_URL + '/' + id);
    }

    updateRezervacija(rezervacija, id) {
        return axios.put(REZERVACIJA_API_BASE_URL + '/' + id, rezervacija);
    }

    deleteRezervacija(id) {
        return axios.delete(REZERVACIJA_API_BASE_URL + '/' + id);
    }

}

export default new RezervacijaService();