import React, { Component } from 'react';
import RezervacijaService from '../../services/RezervacijaService';
import KorisnikService from '../../services/KorisnikService';
import AutomobilService from '../../services/AutomobilService';

class Rezervacija extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rezervacija : [],
            korisnici: [],
            automobili: []
        }
        this.insertRezervacija = this.insertRezervacija.bind(this);
        this.updateRezervacija = this.updateRezervacija.bind(this);
        this.deleteRezervacija = this.deleteRezervacija.bind(this);
    }

    componentDidMount() {
        /* RezervacijaService.getRezervacijaById(this.state.id).then( (res) => {
            let rezervacija = res.data;
            this.setState({korisnik: rezervacija.korisnik,
                automobil: rezervacija.automobil,
                datumIzdavanja: rezervacija.datumIzdavanja,
                datumVracanja: rezervacija.datumVracanja
            });
        }); */

        RezervacijaService.getRezervacije().then((res) => {
            this.setState({ rezervacija: res.data });
        });

        KorisnikService.getKorisnike().then((res) => {
            this.setState({ korisnici: res.data });
        });
        AutomobilService.getAutomobile().then((res) => {
            this.setState({ automobili: res.data });
        });
    }

    insertRezervacija() {
        this.props.history.push('insert-rezervacija/_insert');
    }

    updateRezervacija(id) {
        this.props.history.push(`/insert-rezervacija/${id}`);
    }

    deleteRezervacija(id) {
        RezervacijaService.deleteRezervacija(id).then ( res => {
            this.setState({rezervacija: this.state.rezervacija.filter(rezervacija => rezervacija.id !== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Rezervacije</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertRezervacija}>Dodaj rezervaciju</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Datum izdavanja</th>
                                <th>Datum vraćanja</th>
                                <th>Korisničko ime korisnika</th>
                                <th>Naziv tipa automobila</th>
                                <th>Naziv modela automobila</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rezervacija.map(
                                    rezervacija =>
                                    <tr key = {rezervacija.id}>
                                        <td>{rezervacija.datumIzdavanja}</td>
                                        <td>{rezervacija.datumVracanja}</td>
                                        <td>{rezervacija.korisnik}</td>
                                        <td>{rezervacija.automobil.tip.nazivTipa}</td>
                                        <td>{rezervacija.automobil.model.nazivModela}</td>
                                        <td>
                                            <button onClick={ () => this.updateRezervacija(rezervacija.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRezervacija(rezervacija.id)} className="btn btn-danger">Obriši</button>
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

export default Rezervacija;