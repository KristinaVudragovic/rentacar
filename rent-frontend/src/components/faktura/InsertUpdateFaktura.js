import React, { Component } from 'react';
import FakturaService from '../../services/FakturaService';
import KorisnikService from '../../services/KorisnikService';
import NacinPlacanjaService from '../../services/NacinPlacanjaService';
import RezervacijaService from '../../services/RezervacijaService';

class InsertUpdateFaktura extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nacinPlacanja: null,
            rezervacija: null,
            korisnik: null,
            cena: '',
            datum: '',
            sviNP: [],
            rezervacije: [],
            korisnici: []
        }
        /* this.changeNacinPlacanjaHandler = this.changeNacinPlacanjaHandler(this);
        this.changeRezervacijaHandler = this.changeRezervacijaHandler(this);
        this.changeCenaHandler = this.changeCenaHandler(this);
        this.changeDatumHandler = this.changeDatumHandler(this);
        this.sacuvajIzmeniFakturu = this.sacuvajIzmeniFakturu(this); */
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            NacinPlacanjaService.getNacinePlacanja().then((res) => {
                this.setState({ sviNP: res.data });
            });
            RezervacijaService.getRezervacije().then((res) => {
                this.setState({ rezervacije: res.data });
            });
            KorisnikService.getKorisnike().then((res) => {
                this.setState({ korisnici: res.data });
            });
        } else {
            FakturaService.getFakturaById(this.state.id).then( (res) => {
                let faktura = res.data;
                this.setState({cena: faktura.cena,
                    datum: faktura.datum,
                    nacinPlacanja: faktura.nacinPlacanja,
                    rezervacija: faktura.rezervacija,
                    korisnik: faktura.korisnik
                });
            });
            NacinPlacanjaService.getNacinePlacanja().then((res) => {
                this.setState({ sviNP: res.data });
            });
            RezervacijaService.getRezervacije().then((res) => {
                this.setState({ rezervacije: res.data });
            });
            KorisnikService.getKorisnike().then((res) => {
                this.setState({ korisnici: res.data });
            });
        }
    }

    sacuvajIzmeniFakturu = (e) => {
        e.preventDefault();
        let faktura = { 
            cena: this.state.cena, 
            datum: this.state.datum, 
            nacinPlacanja: this.state.nacinPlacanja, 
            rezervacija: this.state.rezervacija,
            korisnik: this.state.korisnik
        };
        console.log('faktura => ' + JSON.stringify(faktura));

        if(this.state.id === '_insert'){
            FakturaService.insertFaktura(faktura).then(res => {
                this.props.history.push('/faktura');
            });
        } else {
            FakturaService.updateFaktura(faktura, this.state.id).then(res => {
                this.props.history.push('/faktura');
            });
        }
    }

    otkazi () {
        this.props.history.push('/faktura');
    }

    changeCenaHandler = (event) => {
        this.setState ({cena: event.target.value});
    }

    changeDatumHandler = (event) => {
        this.setState ({datum: event.target.value});
    }

    changeNacinPlacanjaHandler = (event) => {
        let np = (event.target.value);
        NacinPlacanjaService.getNacinPlacanjaById(np).then((response)=> {
            this.setState({nacinPlacanja: response.data})
       })
       console.log(this.state.nacinPlacanja);
    }

    changeRezervacijaHandler = (event) => {
        let r = (event.target.value);
        RezervacijaService.getRezervacijaById(r).then((response)=> {
            this.setState({rezervacija: response.data})
       })
       console.log(this.state.rezervacija);
    }

    changeKorisnikHandler = (event) => {
        let k = (event.target.value);
        KorisnikService.getKorisnikById(k).then((response)=> {
            this.setState({korisnik: response.data})
       })
       console.log(this.state.korisnik);
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj fakturu</h3>
        } else {
            return <h3 className="text-center">Izmeni fakturu</h3>
        }
    }

    render() {

        let options= this.state.sviNP;
        let options1 = this.state.rezervacije;
        let options2 = this.state.korisnici;

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
                                        <label> Cena fakture: </label>
                                        <input placeholder="Cena fakture" name="cena" className="form-control"
                                            value={this.state.cena} onChange={this.changeCenaHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Datum fakture: </label>
                                        <input placeholder="Datum fakture" name="datum" className="form-control"
                                            value={this.state.datum} onChange={this.changeDatumHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Način plaćanja: </label>
                                            <select className="form-control" id="nacinPlacanja" onChange={this.changeNacinPlacanjaHandler}  >
                                                {options.map((option, index) => 
                                                <option  key = {index}   value={option.id}> {option.nazivPlacanja}
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Rezervacija: </label>
                                            <select className="form-control" id="rezervacija" onChange={this.changeRezervacijaHandler}  >
                                                {options1.map((option1, index) => 
                                                <option  key = {index}   value={option1.id}> 
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Zaposleni: </label>
                                            <select className="form-control" id="korisnik_id" onChange={this.changeRezervacijaHandler}  >
                                                {options2.map((option2, index) => 
                                                <option  key = {index}   value={option2.id}> {option2.username}
                                                </option>
                                            )}
                                            </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniFakturu}>Sačuvaj</button>
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

export default InsertUpdateFaktura;