import React, { Component } from 'react';
import KorisnikService from '../../services/KorisnikService';

class Korisnik extends Component {

    constructor(props) {
        super(props)

        this.state = {
            korisnici : []
        }
        this.insertKorisnik = this.insertKorisnik.bind(this);
        this.updateKorisnik = this.updateKorisnik.bind(this);
        this.deleteKorisnik = this.deleteKorisnik.bind(this);
        this.viewKorisnik = this.viewKorisnik.bind(this);
    }

    componentDidMount() {
        KorisnikService.getKorisnike().then((res) => {
            this.setState({ korisnici: res.data });
        });
    }

    insertKorisnik() {
        this.props.history.push('/insert-korisnik/_insert');
    }

    updateKorisnik(id) {
        this.props.history.push(`/insert-korisnik/${id}`);
    }

    deleteKorisnik(id) {
        KorisnikService.deleteKorisnik(id).then ( res => {
            this.setState({korisnici: this.state.korisnici.filter(korisnik => korisnik.id !== id)});
        });
    }

    viewKorisnik(id) {
        this.props.history.push(`/view-korisnik/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Korisnici</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertKorisnik}>Dodaj korisnika</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Email</th>
                                {/* <th>Mesto</th>
                                <th>Adresa</th>
                                <th>Kontakt</th>
                                <th>Korisnicko ime</th>
                                <th>Lozinka</th> */}
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.korisnici.map(
                                    korisnik =>
                                    <tr key = {korisnik.id}>
                                        <td>{korisnik.imeKor}</td>
                                        <td>{korisnik.prezimeKor}</td>
                                        <td>{korisnik.emailKor}</td>
                                        {/* <td>{zaposleni.mestoZap}</td>
                                        <td>{zaposleni.adresaZap}</td>
                                        <td>{zaposleni.kontaktZap}</td>
                                        <td>{zaposleni.korisnickoImeZap}</td>
                                        <td>{zaposleni.lozinkaZap}</td> */}
                                        <td>
                                            <button onClick={ () => this.updateKorisnik(korisnik.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKorisnik(korisnik.id)} className="btn btn-danger">Obriši</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewKorisnik(korisnik.id)} className="btn btn-info">Pregledaj</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Korisnik;