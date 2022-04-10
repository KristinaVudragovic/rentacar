import React, { Component } from 'react';
import MarkaService from '../../services/MarkaService';
import ModelService from '../../services/ModelService';

class InsertUpdateModel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nazivModela: '',
            marka: null,
            marke: []
        }
        // this.changeNazivModelaHandler = this.changeNazivModelaHandler(this);
        // this.changeMarkaHandler = this.changeMarkaHandler(this);
        // this.sacuvajIzmeniModel = this.sacuvajIzmeniModel(this);
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            MarkaService.getMarke().then((res) => {
                this.setState({ marke: res.data });
            });
        } else {
            ModelService.getModelById(this.state.id).then( (res) => {
                let model = res.data;
                this.setState({nazivModela: model.nazivModela,
                    marka: model.marka
                });
            });
            MarkaService.getMarke().then((res) => {
                this.setState({ marke: res.data });
            });
        }
    }

    sacuvajIzmeniModel = (e) => {
        e.preventDefault();
        let model = {nazivModela: this.state.nazivModela, marka: this.state.marka};
        console.log('model => ' + JSON.stringify(model));

        if(this.state.id === '_insert'){
            ModelService.insertModel(model).then(res => {
                this.props.history.push('/model');
            });
        } else {
            ModelService.updateModel(model, this.state.id).then(res => {
                this.props.history.push('/model');
            });
        }
    }

    otkazi () {
        this.props.history.push('/model');
    }

    changeNazivModelaHandler = (event) => {
        this.setState ({nazivModela: event.target.value});
    }

    changeMarkaHandler = (event) => {
        let m = (event.target.value);
        MarkaService.getMarkaById(m).then((response)=> {
            this.setState({marka: response.data})
       })
       console.log(this.state.marka);
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj model automobila</h3>
        } else {
            return <h3 className="text-center">Izmeni model automobila</h3>
        }
    }

    render() {
        let  options = this.state.marke;

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getNaziv()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Naziv modela: </label>
                                        <input placeholder="Naziv modela" name="nazivModela" className="form-control"
                                            value={this.state.nazivModela} onChange={this.changeNazivModelaHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Marka: </label>
                                            <select className="form-control" id="marka" onChange={this.changeMarkaHandler}  >
                                                {options.map((option, index) => 
                                                <option  key = {index}   value={option.id}> {option.nazivMarke}
                                                </option>
                                            )}
                                            </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniModel}>Sačuvaj</button>
                                    <button className="btn btn-danger" onClick={this.otkazi.bind(this)} style={{marginLeft: "10px"}}>Otkaži</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsertUpdateModel;