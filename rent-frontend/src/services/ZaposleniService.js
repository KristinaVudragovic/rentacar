import axios from 'axios';

const ZAPOSLENI_API_BASE_URL = "http://localhost:8083/zaposleni";

class ZaposleniService {

    getZaposleni(){
        return axios.get(ZAPOSLENI_API_BASE_URL);
    }

    insertZaposleni(zaposleni){
        return axios.post(ZAPOSLENI_API_BASE_URL, zaposleni);
    }

    getZaposleniById(id){
        return axios.get(ZAPOSLENI_API_BASE_URL + '/' + id);
    }

    updateZaposleni(zaposleni, id){
        return axios.put(ZAPOSLENI_API_BASE_URL + '/' + id, zaposleni);
    }

    deleteZaposleni(id){
        return axios.delete(ZAPOSLENI_API_BASE_URL + '/' + id);
    }
}

export default new ZaposleniService() //objekat klase