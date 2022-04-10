import React, { Component } from 'react';
import AutomobilService from '../../services/AutomobilService';
import ModelService from '../../services/ModelService';
import TipService from '../../services/TipService';

class InsertUpdateAutomobil extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tip: null,
            model: null,
            brojSasije: '',
            kubikaza: '',
            konjskaSnaga: '',
            dostupan: '',
            cenaPoDanu: '',
            tipovi: [],
            modeli: []
        }
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            TipService.getTipove().then((res) => {
                this.setState({ tipovi: res.data });
            });
            ModelService.getModele().then((res) => {
                this.setState({ modeli: res.data });
            });
        } else {
            AutomobilService.getAutomobilById(this.state.id).then( (res) => {
                let automobil = res.data;
                this.setState({tip: automobil.tip,
                    model: automobil.model,
                    brojSasije: automobil.brojSasije,
                    kubikaza: automobil.kubikaza,
                    konjskaSnaga: automobil.konjskaSnaga,
                    dostupan: automobil.dostupan,
                    cenaPoDanu: automobil.cenaPoDanu
                });
            });
            TipService.getTipove().then((res) => {
                this.setState({ tipovi: res.data });
            });
            ModelService.getModele().then((res) => {
                this.setState({ modeli: res.data });
            });
        }
    }

    sacuvajIzmeniAutomobil = (e) => {
        e.preventDefault();
        let automobil = { 
            tip: this.state.tip, 
            model: this.state.model, 
            brojSasije: this.state.brojSasije, 
            kubikaza: this.state.kubikaza,
            konjskaSnaga: this.state.konjskaSnaga, 
            dostupan: this.state.dostupan, 
            cenaPoDanu: this.state.cenaPoDanu
        }
        console.log('automobil => ' + JSON.stringify(automobil));

        if(this.state.id === '_insert'){
            AutomobilService.insertAutomobil(automobil).then(res => {
                this.props.history.push('/automobil');
            });
        } else {
            AutomobilService.updateAutomobil(automobil, this.state.id).then(res => {
                this.props.history.push('/automobil');
            });
        }
    }

    otkazi () {
        this.props.history.push('/automobil');
    }

    changeBrojSasijeHandler = (event) => {
        this.setState ({brojSasije: event.target.value});
    }

    changeKubikazaHandler = (event) => {
        this.setState ({kubikaza: event.target.value});
    }

    changeKonjskaSnagaHandler = (event) => {
        this.setState ({konjskaSnaga: event.target.value});
    }

    changeDostupanHandler = (event) => {
        this.setState ({dostupan: event.target.value});
    }

    changeCenaPoDanuHandler = (event) => {
        this.setState ({cenaPoDanu: event.target.value});
    }

    changeTipHandler = (event) => {
        let t = (event.target.value);
        TipService.getTipById(t).then((response)=> {
            this.setState({tip: response.data})
       })
       console.log(this.state.tip);
    }

    changeModelHandler = (event) => {
        let m = (event.target.value);
        ModelService.getModelById(m).then((response)=> {
            this.setState({model: response.data})
       })
       console.log(this.state.model);
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj automobil</h3>
        } else {
            return <h3 className="text-center">Izmeni automobil</h3>
        }
    }

    render() {

        let options= this.state.tipovi;
        let options1 = this.state.modeli;

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
                                        <label> Tip automobila: </label>
                                            <select className="form-control" id="tip" onChange={this.changeTipHandler}  >
                                                {options.map((option, index) => 
                                                <option  key = {index}   value={option.id}> {option.nazivTipa}
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Model automobila: </label>
                                            <select className="form-control" id="model" onChange={this.changeModelHandler}  >
                                                {options1.map((option1, index) => 
                                                <option  key = {index}   value={option1.id}> {option1.nazivModela}
                                                </option>
                                            )}
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Broj šasije: </label>
                                        <input placeholder="Broj šasije" name="brojSasije" className="form-control"
                                            value={this.state.brojSasije} onChange={this.changeBrojSasijeHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Kubikaža: </label>
                                        <input placeholder="Kubikaža" name="kubikaza" className="form-control"
                                            value={this.state.kubikaza} onChange={this.changeKubikazaHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Konjska snaga: </label>
                                        <input placeholder="Konjska snaga" name="konjskaSnaga" className="form-control"
                                            value={this.state.konjskaSnaga} onChange={this.changeKonjskaSnagaHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Cena po danu: </label>
                                        <input placeholder="Cena po danu" name="cenaPoDanu" className="form-control"
                                            value={this.state.cenaPoDanu} onChange={this.changeCenaPoDanuHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Dostupan: </label>
                                        <input placeholder="Dostupan" name="dostupan" className="form-control"
                                            value={this.state.dostupan} onChange={this.changeDostupanHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniAutomobil}>Sačuvaj</button>
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

export default InsertUpdateAutomobil;