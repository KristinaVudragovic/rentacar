import axios from 'axios';

const KORISNIK_API_BASE_URL = "http://localhost:8083/korisnik";

class KorisnikService {

    getKorisnike(){
        return axios.get(KORISNIK_API_BASE_URL);
    }

    insertKorisnik(korisnik){
        return axios.post(KORISNIK_API_BASE_URL, korisnik);
    }

    getKorisnikById(id){
        return axios.get(KORISNIK_API_BASE_URL + '/' + id);
    }

    updateKorisnik(korisnik, id){
        return axios.put(KORISNIK_API_BASE_URL + '/' + id, korisnik);
    }

    deleteKorisnik(id){
        return axios.delete(KORISNIK_API_BASE_URL + '/' + id);
    }
}

export default new KorisnikService()