import React, { Component } from 'react';
import ZaposleniService from '../../services/ZaposleniService';

class Zaposleni extends Component {

    constructor(props) {
        super(props)

        this.state = {
            zaposleni : []
        }
        this.insertZaposleni = this.insertZaposleni.bind(this);
        this.updateZaposleni = this.updateZaposleni.bind(this);
        this.deleteZaposleni = this.deleteZaposleni.bind(this);
        this.viewZaposleni = this.viewZaposleni.bind(this);
    }

    componentDidMount() {
        ZaposleniService.getZaposleni().then((res) => {
            this.setState({ zaposleni: res.data });
        });
    }

    insertZaposleni() {
        this.props.history.push('/insert-zaposleni/_insert');
    }

    updateZaposleni(id) {
        this.props.history.push(`/insert-zaposleni/${id}`);
    }

    deleteZaposleni(id) {
        ZaposleniService.deleteZaposleni(id).then ( res => {
            this.setState({zaposleni: this.state.zaposleni.filter(zaposleni => zaposleni.id !== id)});
        });
    }

    viewZaposleni(id) {
        this.props.history.push(`/view-zaposleni/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Zaposleni</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertZaposleni}>Dodaj zaposlenog</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Jmbg</th>
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
                                this.state.zaposleni.map(
                                    zaposleni =>
                                    <tr key = {zaposleni.id}>
                                        <td>{zaposleni.imeZap}</td>
                                        <td>{zaposleni.prezimeZap}</td>
                                        <td>{zaposleni.jmbgZap}</td>
                                        {/* <td>{zaposleni.mestoZap}</td>
                                        <td>{zaposleni.adresaZap}</td>
                                        <td>{zaposleni.kontaktZap}</td>
                                        <td>{zaposleni.korisnickoImeZap}</td>
                                        <td>{zaposleni.lozinkaZap}</td> */}
                                        <td>
                                            <button onClick={ () => this.updateZaposleni(zaposleni.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteZaposleni(zaposleni.id)} className="btn btn-danger">Obriši</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewZaposleni(zaposleni.id)} className="btn btn-info">Pregledaj</button>
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

export default Zaposleni;