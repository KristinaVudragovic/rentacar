import React, { Component } from 'react';
import TipService from '../../services/TipService';

class InsertUpdateTip extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nazivTipa: ''
        }
        this.changeNazivTipaHandler = this.changeNazivTipaHandler.bind(this);
        this.sacuvajIzmeniTip = this.sacuvajIzmeniTip.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            return
        } else {
            TipService.getTipById(this.state.id).then( (res) => {
                let tip = res.data;
                this.setState({nazivTipa: tip.nazivTipa});                
            });
        }
    }

    sacuvajIzmeniTip = (e) => {
        e.preventDefault();
        let tip = {nazivTipa: this.state.nazivTipa};
        console.log('tip => ' + JSON.stringify(tip));

        if(this.state.id === '_insert'){
            TipService.insertTip(tip).then(res =>{
                this.props.history.push('/tip');
            });
        } else {
            TipService.updateTip(tip, this.state.id).then(res => {
                this.props.history.push('/tip');
            });
        }
    }

    changeNazivTipaHandler = (event) => {
        this.setState ({nazivTipa: event.target.value});
    }

    otkazi () {
        this.props.history.push('/tip');
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj tip automobila</h3>
        } else {
            return <h3 className="text-center">Izmeni tip automobila</h3>
        }
    }

    render() {
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
                                        <label> Naziv tipa: </label>
                                        <input placeholder="Naziv tipa" name="nazivTipa" className="form-control"
                                            value={this.state.nazivTipa} onChange={this.changeNazivTipaHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniTip}>Sačuvaj</button>
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

export default InsertUpdateTip;