import React, { Component } from 'react';
import ZaposleniService from '../../services/ZaposleniService';

class UpdateZaposleni extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            imeZap: '',
            prezimeZap: '',
            jmbgZap: '',
            mestoZap: '',
            adresaZap: '',
            kontaktZap: '',
            korisnickoImeZap: '',
            lozinkaZap: ''
        }
        this.changeImeZapHandler = this.changeImeZapHandler.bind(this);
        this.changePrezimeZapHandler = this.changePrezimeZapHandler.bind(this);
        // this.changeJmbgZapHandler = this.changeJmbgZapHandler.bind(this);
        // this.changeMestoZapHandler = this.changeMestoZapHandler.bind(this);
        // this.changeAdresaZapHandler = this.changeAdresaZapHandler.bind(this);
        // this.changeKontaktZapHandler = this.changeKontaktZapHandler.bind(this);
        // this.changeKorisnickoImeZapHandler = this.changeKorisnickoImeZapHandler.bind(this);
        // this.changeLozinkaZapHandler = this.changeLozinkaZapHandler.bind(this);
        this.izmeniZaposlenog = this.izmeniZaposlenog.bind(this);
    }

    componentDidMount(){
        ZaposleniService.getZaposleniById(this.state.id).then( (res) => {
            let zaposleni = res.data;
            this.setState({imeZap: zaposleni.imeZap,
                prezimeZap: zaposleni.prezimeZap,
                jmbgZap: zaposleni.jmbgZap,
                mestoZap: zaposleni.mestoZap,
                adresaZap: zaposleni.adresaZap,
                kontaktZap: zaposleni.kontaktZap,
                korisnickoImeZap: zaposleni.korisnickoImeZap,
                lozinkaZap: zaposleni.lozinkaZap
            });
        });
    }

    izmeniZaposlenog = (e) => {
        e.preventDefault();
        let zaposleni = {imeZap: this.state.imeZap, prezimeZap: this.state.prezimeZap, jmbgZap: this.state.jmbgZap, mestoZap: this.state.mestoZap,
            adresaZap: this.state.adresaZap, kontaktZap: this.state.kontaktZap, korisnickoImeZap: this.state.korisnickoImeZap, lozinkaZap: this.state.lozinkaZap};
        console.log('zaposleni => ' + JSON.stringify(zaposleni));
        ZaposleniService.updateZaposleni(zaposleni, this.state.id).then(res => {
            this.props.history.push('/zaposleni');
        });
        
    }

    otkazi () {
        this.props.history.push('/zaposleni');
    }

    changeImeZapHandler = (event) => {
        this.setState ({imeZap: event.target.value});
    }

    changePrezimeZapHandler = (event) => {
        this.setState ({prezimeZap: event.target.value});
    }
    
    changeJmbgZapHandler = (event) => {
        this.setState ({jmbgZap: event.target.value});
    }

    changeMestoZapHandler = (event) => {
        this.setState ({mestoZap: event.target.value});
    }

    changeAdresaZapHandler = (event) => {
        this.setState ({adresaZap: event.target.value});
    }

    changeKontaktZapHandler = (event) => {
        this.setState ({kontaktZap: event.target.value});
    }

    changeKorisnickoImeZapHandler = (event) => {
        this.setState ({korisnickoImeZap: event.target.value});
    }

    changeLozinkaZapHandler = (event) => {
        this.setState ({lozinkaZap: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Izmeni zaposlenog</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Ime zaposlenog: </label>
                                        <input placeholder="Ime zaposlenog" name="imeZap" className="form-control"
                                            value={this.state.imeZap} onChange={this.changeImeZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Prezime zaposlenog: </label>
                                        <input placeholder="Prezime zaposlenog" name="prezimeZap" className="form-control"
                                            value={this.state.prezimeZap} onChange={this.changePrezimeZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Jmbg zaposlenog: </label>
                                        <input placeholder="Jmbg zaposlenog" name="jmbgZap" className="form-control"
                                            value={this.state.jmbgZap} onChange={this.changeJmbgZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Mesto zaposlenog: </label>
                                        <input placeholder="Mesto zaposlenog" name="mestoZap" className="form-control"
                                            value={this.state.mestoZap} onChange={this.changeMestoZapHandler}></input>
                                    </div><div className="form-group">
                                        <label> Adresa zaposlenog: </label>
                                        <input placeholder="Adresa zaposlenog" name="adresaZap" className="form-control"
                                            value={this.state.adresaZap} onChange={this.changeAdresaZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Kontakt zaposlenog: </label>
                                        <input placeholder="Kontakt zaposlenog" name="kontaktZap" className="form-control"
                                            value={this.state.kontaktZap} onChange={this.changeKontaktZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Korisni??ko ime zaposlenog: </label>
                                        <input placeholder="Korisni??ko ime zaposlenog" name="korisnickoImeZap" className="form-control"
                                            value={this.state.korisnickoImeZap} onChange={this.changeKorisnickoImeZapHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Lozinka zaposlenog: </label>
                                        <input placeholder="Lozinka zaposlenog" name="LozinkaZap" className="form-control"
                                            value={this.state.lozinkaZap} onChange={this.changeLozinkaZapHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.izmeniZaposlenog}>Sa??uvaj</button>
                                    <button className="btn btn-danger" onClick={this.otkazi.bind(this)} style={{marginLeft: "10px"}}>Otka??i</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateZaposleni;