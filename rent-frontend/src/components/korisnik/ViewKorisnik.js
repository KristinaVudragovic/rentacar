import React, { Component } from 'react';
import KorisnikService from '../../services/KorisnikService';

class ViewKorisnik extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            korisnici: {}
        }
    }

    componentDidMount() {
        KorisnikService.getKorisnikById(this.state.id).then ( res => {
            this.setState({ korisnici: res.data });
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center">Pregledaj korisnika</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Ime: { this.state.korisnici.imeKor }</label>
                        </div>
                        <div className = "row">
                            <label> Prezime: { this.state.korisnici.prezimeKor }</label>
                        </div>
                        <div className = "row">
                            <label> Jmbg: { this.state.korisnici.jmbgKor }</label>
                        </div>
                        <div className = "row">
                            <label> Email: { this.state.korisnici.emailKor }</label>
                        </div>
                        <div className = "row">
                            <label> Mesto: { this.state.korisnici.mestoKor }</label>
                        </div>
                        <div className = "row">
                            <label> Adresa: { this.state.korisnici.adresaKor }</label>
                        </div>
                        <div className = "row">
                            <label> Kontakt: { this.state.korisnici.kontaktKor }</label>
                        </div>
                        <div className = "row">
                            <label> Korisničko ime: { this.state.korisnici.korisnickoImeKor }</label>
                        </div>
                        <div className = "row">
                            <label> Lozinka: { this.state.korisnici.lozinkaKor }</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewKorisnik;