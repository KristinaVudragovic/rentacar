import React, { Component } from 'react';
import TipService from '../../services/TipService';

class Tip extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tip : []
        }
        this.insertTip = this.insertTip.bind(this);
        this.updateTip = this.updateTip.bind(this);
        this.deleteTip = this.deleteTip.bind(this);
    }

    componentDidMount() {
        TipService.getTipove().then((res) => {
            this.setState({ tip: res.data });
        });
    }

    insertTip() {
        this.props.history.push('insert-tip/_insert');
    }

    updateTip(id) {
        this.props.history.push(`/insert-tip/${id}`);
    }

    deleteTip(id) {
        TipService.deleteTip(id).then ( res => {
            this.setState({tip: this.state.tip.filter(tip => tip.id !== id)});
            window.location.reload();
        });
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Tipovi automobila</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertTip}>Dodaj tip</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Naziv tipa automobila</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tip.map(
                                    tip =>
                                    <tr key = {tip.id}>
                                        <td>{tip.nazivTipa}</td>
                                        <td>
                                            <button onClick={ () => this.updateTip(tip.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTip(tip.id)} className="btn btn-danger">Obriši</button>
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

export default Tip;