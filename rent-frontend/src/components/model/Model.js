import React, { Component } from 'react';
//import MarkaService from '../services/MarkaService';
import ModelService from '../../services/ModelService';

class Model extends Component {

    constructor(props) {
        super(props)

        this.state = {
            model : [],
            //marka: []
        }
        this.insertModel = this.insertModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.deleteModel = this.deleteModel.bind(this);
    }

    componentDidMount() {
        ModelService.getModele().then((res) => {
            this.setState({ model: res.data });
        });
        // MarkaService.getMarke().then((res) => {
        //     this.setState({ marka: res.data });
        // });
    }

    insertModel() {
        this.props.history.push('insert-model/_insert');
    }

    updateModel(id) {
        this.props.history.push(`/insert-model/${id}`);
    }

    deleteModel(id) {
        ModelService.deleteModel(id).then ( res => {
            this.setState({model: this.state.model.filter(model => model.id !== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Modeli automobila</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.insertModel}>Dodaj model</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Naziv modela automobila</th>
                                <th>Marka modela</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.model.map(
                                    model =>
                                    <tr key = {model.id}>
                                        <td>{model.nazivModela}</td>
                                        <td>{model.marka.nazivMarke}</td>
                                        <td>
                                            <button onClick={ () => this.updateModel(model.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteModel(model.id)} className="btn btn-danger">Obriši</button>
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

export default Model;