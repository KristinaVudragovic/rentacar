import React, { Component } from 'react';
import ZaposleniService from '../../services/ZaposleniService';

class ViewZaposleni extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            zaposleni: {}
        }
    }

    componentDidMount() {
        ZaposleniService.getZaposleniById(this.state.id).then ( res => {
            this.setState({ zaposleni: res.data });
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center">Pregledaj zaposlenog</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Ime: { this.state.zaposleni.imeZap }</label>
                        </div>
                        <div className = "row">
                            <label> Prezime: { this.state.zaposleni.prezimeZap }</label>
                        </div>
                        <div className = "row">
                            <label> Jmbg: { this.state.zaposleni.jmbgZap }</label>
                        </div>
                        <div className = "row">
                            <label> Mesto: { this.state.zaposleni.mestoZap }</label>
                        </div>
                        <div className = "row">
                            <label> Adresa: { this.state.zaposleni.adresaZap }</label>
                        </div>
                        <div className = "row">
                            <label> Kontakt: { this.state.zaposleni.kontaktZap }</label>
                        </div>
                        <div className = "row">
                            <label> Korisničko ime: { this.state.zaposleni.korisnickoImeZap }</label>
                        </div>
                        <div className = "row">
                            <label> Lozinka: { this.state.zaposleni.lozinkaZap }</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewZaposleni;