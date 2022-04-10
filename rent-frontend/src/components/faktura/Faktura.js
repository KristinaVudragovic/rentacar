import React, { Component } from 'react';
import FakturaService from '../../services/FakturaService';

class Faktura extends Component {

    constructor(props) {
        super(props)

        this.state = {
            faktura : []
        }
        this.insertFaktura = this.insertFaktura.bind(this);
        this.updateFaktura = this.updateFaktura.bind(this);
    }

    componentDidMount() {
        FakturaService.getFakture().then((res) => {
            this.setState({ faktura: res.data });
        });
    }

    insertFaktura() {
        this.props.history.push('insert-faktura/_insert');
    }

    updateFaktura(id) {
        this.props.history.push(`/insert-faktura/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Fakture</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertFaktura}>Dodaj fakturu</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Cena</th>
                                <th>Datum</th>
                                <th>Način plaćanja</th>
                                <th>Rezervacija</th>
                                <th>Zaposleni</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.faktura.map(
                                    faktura =>
                                    <tr key = {faktura.id}>
                                        <td>{faktura.cena}</td>
                                        <td>{faktura.datum}</td>
                                        <td>{faktura.nacinPlacanja.nazivPlacanja}</td>
                                        <td>{faktura.rezervacija}</td>
                                        <td>{faktura.korisnik.username}</td>
                                        <td>
                                            <button onClick={ () => this.updateFaktura(faktura.id)} className="btn btn-info">Izmeni</button>
                                            {/* <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAutomobil(automobil.id)} className="btn btn-danger">Obriši</button> */}
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

export default Faktura;