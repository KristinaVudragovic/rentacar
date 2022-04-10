import React, { Component } from 'react';
import RezervacijaService from '../../services/RezervacijaService';
import KorisnikService from '../../services/KorisnikService';
import AutomobilService from '../../services/AutomobilService';

class InsertUpdateRezervacija extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            korisnik: null,
            automobil: null,
            datumIzdavanja: '',
            datumVracanja: '',
            korisnici: [],
            automobili: []
        }
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            KorisnikService.getKorisnike().then((res) => {
                this.setState({ korisnici: res.data });
            });
            AutomobilService.getAutomobile().then((res) => {
                this.setState({ automobili: res.data });
            });
        } else {
            RezervacijaService.getRezervacijaById(this.state.id).then( (res) => {
                let rezervacija = res.data;
                this.setState({korisnik: rezervacija.korisnik,
                    automobil: rezervacija.automobil,
                    datumIzdavanja: rezervacija.datumIzdavanja,
                    datumVracanja: rezervacija.datumVracanja
                });
            });
            KorisnikService.getKorisnike().then((res) => {
                this.setState({ korisnici: res.data });
            });
            AutomobilService.getAutomobile().then((res) => {
                this.setState({ automobili: res.data });
            });
        }
    }

    sacuvajIzmeniRezervaciju = (e) => {
        e.preventDefault();
        let rezervacija = { 
            korisnik: this.state.korisnik, 
            automobil: this.state.automobil, 
            datumIzdavanja: this.state.datumIzdavanja, 
            datumVracanja: this.state.datumVracanja
        };
        console.log('rezervacija => ' + JSON.stringify(rezervacija));

        if(this.state.id === '_insert'){
            RezervacijaService.insertRezervacija(rezervacija).then(res => {
                this.props.history.push('/rezervacija');
            });
        } else {
            RezervacijaService.updateRezervacija(rezervacija, this.state.id).then(res => {
                this.props.history.push('/rezervacija');
            });
        }
    }

    otkazi () {
        this.props.history.push('/automobil');
    }

    changeDatumIzdavanjaHandler = (event) => {
        this.setState ({datumIzdavanja: event.target.value});
    }

    changeDatumVracanjaHandler = (event) => {
        this.setState ({datumVracanja: event.target.value});
    }

    changeKorisnikHandler = (event) => {
        let k = (event.target.value);
        KorisnikService.getKorisnikById(k).then((response)=> {
            this.setState({korisnik: response.data})
       })
       console.log(this.state.korisnik);
    }

    changeAutomobilHandler = (event) => {
        let a = (event.target.value);
        AutomobilService.getAutomobilById(a).then((response)=> {
            this.setState({automobil: response.data})
       })
       console.log(this.state.automobil);
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj rezervaciju</h3>
        } else {
            return <h3 className="text-center">Izmeni rezervaciju</h3>
        }
    }

    render() {

        let options= this.state.korisnici;
        let options1 = this.state.automobili;

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
                                        <label> Korisničko ime korisnika: </label>
                                            <select className="form-control" id="korisnik" onChange={this.changeKorisnikHandler}  >
                                                {options.map((option, index) => 
                                                <option  key = {index}   value={option.id}> {option.username}
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Tip automobila: </label>
                                            <select className="form-control" id="automobil" onChange={this.changeAutomobilHandler}  >
                                                {options1.map((option1, index) => 
                                                <option  key = {index}   value={option1.id}> {option1.tip.nazivTipa} 
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Model automobila: </label>
                                            <select className="form-control" id="automobil" onChange={this.changeAutomobilHandler}  >
                                                {options1.map((option1, index) => 
                                                <option  key = {index}   value={option1.id}> {option1.model.nazivModela} 
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Datum izdavanja: </label>
                                        <input placeholder="Datum izdavanja" name="datumIzdavanja" className="form-control"
                                            value={this.state.datumIzdavanja} onChange={this.changeDatumIzdavanjaHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Datum vraćanja: </label>
                                        <input placeholder="Datum vraćanja" name="datumVracanja" className="form-control"
                                            value={this.state.datumVracanja} onChange={this.changeDatumVracanjaHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniRezervaciju}>Sačuvaj</button>
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

export default InsertUpdateRezervacija;