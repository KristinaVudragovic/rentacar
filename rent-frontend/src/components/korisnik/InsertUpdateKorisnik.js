import React, { Component } from 'react';
import KorisnikService from '../../services/KorisnikService';

class InsertUpdateKorisnik extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            imeKor: '',
            prezimeKor: '',
            jmbgKor: '',
            emailKor: '',
            mestoKor: '',
            adresaKor: '',
            kontaktKor: '',
            korisnickoImeKor: '',
            lozinkaKor: ''
        }
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            return
        } else {
            KorisnikService.getKorisnikById(this.state.id).then( (res) => {
                let korisnik = res.data;
                this.setState({imeKor: korisnik.imeKor,
                    prezimeKor: korisnik.prezimeKor,
                    jmbgKor: korisnik.jmbgKor,
                    emailKor: korisnik.emailKor,
                    mestoKor: korisnik.mestoKor,
                    adresaKor: korisnik.adresaKor,
                    kontaktKor: korisnik.kontaktKor,
                    korisnickoImeKor: korisnik.korisnickoImeKor,
                    lozinkaKor: korisnik.lozinkaKor
                });
            });
        }
    }

    sacuvajIzmeniKorisnika = (e) => {
        e.preventDefault();
        let korisnik = {imeKor: this.state.imeKor, prezimeKor: this.state.prezimeKor, jmbgKor: this.state.jmbgKor, emailKor: this.state.emailKor, mestoKor: this.state.mestoKor,
        adresaKor: this.state.adresaKor, kontaktKor: this.state.kontaktKor, korisnickoImeKor: this.state.korisnickoImeKor, lozinkaKor: this.state.lozinkaKor};
        console.log('korisnik => ' + JSON.stringify(korisnik));

        if(this.state.id === '_insert'){
            KorisnikService.insertKorisnik(korisnik).then(res =>{
                this.props.history.push('/korisnici');
            });
        } else {
            KorisnikService.updateKorisnik(korisnik, this.state.id).then(res => {
                this.props.history.push('/korisnici');
            });
        }
    }

    otkazi () {
        this.props.history.push('/korisnici');
    }

    changeImeKorHandler = (event) => {
        this.setState ({imeKor: event.target.value});
    }

    changePrezimeKorHandler = (event) => {
        this.setState ({prezimeKor: event.target.value});
    }
    
    changeJmbgKorHandler = (event) => {
        this.setState ({jmbgKor: event.target.value});
    }

    changeEmailKorHandler = (event) => {
        this.setState ({emailKor: event.target.value});
    }

    changeMestoKorHandler = (event) => {
        this.setState ({mestoKor: event.target.value});
    }

    changeAdresaKorHandler = (event) => {
        this.setState ({adresaKor: event.target.value});
    }

    changeKontaktKorHandler = (event) => {
        this.setState ({kontaktKor: event.target.value});
    }

    changeKorisnickoImeKorHandler = (event) => {
        this.setState ({korisnickoImeKor: event.target.value});
    }

    changeLozinkaKorHandler = (event) => {
        this.setState ({lozinkaKor: event.target.value});
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj korisnika</h3>
        } else {
            return <h3 className="text-center">Izmeni korisnika</h3>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getNaziv()
                            }
                            <div className="card-body">
                            <form>
                                    <div className="form-group">
                                        <label> Ime korisnika: </label>
                                        <input placeholder="Ime korisnika" name="imeKor" className="form-control"
                                            value={this.state.imeKor} onChange={this.changeImeKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Prezime korisnika: </label>
                                        <input placeholder="Prezime korisnika" name="prezimeKor" className="form-control"
                                            value={this.state.prezimeKor} onChange={this.changePrezimeKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Jmbg korisnika: </label>
                                        <input placeholder="Jmbg korisnika" name="jmbgKor" className="form-control"
                                            value={this.state.jmbgKor} onChange={this.changeJmbgKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Email korisnika: </label>
                                        <input placeholder="Email korisnika" name="emailZap" className="form-control"
                                            value={this.state.emailKor} onChange={this.changeEmailKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Mesto korisnika: </label>
                                        <input placeholder="Mesto korisnika" name="mestoKor" className="form-control"
                                            value={this.state.mestoKor} onChange={this.changeMestoKorHandler}></input>
                                    </div><div className="form-group">
                                        <label> Adresa korisnika: </label>
                                        <input placeholder="Adresa korisnika" name="adresaKor" className="form-control"
                                            value={this.state.adresaKor} onChange={this.changeAdresaKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Kontakt korisnika: </label>
                                        <input placeholder="Kontakt korisnika" name="kontaktKor" className="form-control"
                                            value={this.state.kontaktKor} onChange={this.changeKontaktKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Korisničko ime korisnika: </label>
                                        <input placeholder="Korisničko ime korisnika" name="korisnickoImeKor" className="form-control"
                                            value={this.state.korisnickoImeKor} onChange={this.changeKorisnickoImeKorHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Lozinka korisnika: </label>
                                        <input placeholder="Lozinka korisnika" name="lozinkaKor" className="form-control"
                                            value={this.state.lozinkaKor} onChange={this.changeLozinkaKorHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniKorisnika}>Sačuvaj</button>
                                    <button className="btn btn-danger" onClick={this.otkazi.bind(this)} style={{marginLeft: "10px"}}>Otkaži</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default InsertUpdateKorisnik;