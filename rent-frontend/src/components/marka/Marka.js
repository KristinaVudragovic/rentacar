import React, { Component } from 'react';
import MarkaService from '../../services/MarkaService';

class Marka extends Component {

    constructor(props) {
        super(props)

        this.state = {
            marka : []
        }
        this.insertMarka = this.insertMarka.bind(this);
        this.updateMarka = this.updateMarka.bind(this);
        this.deleteMarka = this.deleteMarka.bind(this);
    }

    componentDidMount() {
        MarkaService.getMarke().then((res) => {
            this.setState({ marka: res.data });
        });
    }

    insertMarka() {
        this.props.history.push('insert-marka/_insert');
    }

    updateMarka(id) {
        this.props.history.push(`/insert-marka/${id}`);
    }

    deleteMarka(id) {
        MarkaService.deleteMarka(id).then ( res => {
            this.setState({marka: this.state.marka.filter(marka => marka.id !== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Marke automobila</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertMarka}>Dodaj marku</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Naziv marke automobila</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.marka.map(
                                    marka =>
                                    <tr key = {marka.id}>
                                        <td>{marka.nazivMarke}</td>
                                        <td>
                                            <button onClick={ () => this.updateMarka(marka.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMarka(marka.id)} className="btn btn-danger">Obriši</button>
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

export default Marka;