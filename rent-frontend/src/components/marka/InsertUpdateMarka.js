import React, { Component } from 'react';
import MarkaService from '../../services/MarkaService';

class InsertUpdateMarka extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nazivMarke: ''
        }
        this.changeNazivMarkeHandler = this.changeNazivMarkeHandler.bind(this);
        this.sacuvajIzmeniMarku = this.sacuvajIzmeniMarku.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            return
        } else {
            MarkaService.getMarkaById(this.state.id).then( (res) => {
                let marka = res.data;
                this.setState({nazivMarke: marka.nazivMarke});                
            });
        }
    }

    sacuvajIzmeniMarku = (e) => {
        e.preventDefault();
        let marka = {nazivMarke: this.state.nazivMarke};
        console.log('marka => ' + JSON.stringify(marka));

        if(this.state.id === '_insert'){
            MarkaService.insertMarka(marka).then(res => {
                this.props.history.push('/marka');
            });
        } else {
            MarkaService.updateMarka(marka, this.state.id).then(res => {
                this.props.history.push('/marka');
            });
        }
    }

    otkazi () {
        this.props.history.push('/marka');
    }
    
    changeNazivMarkeHandler = (event) => {
        this.setState ({nazivMarke: event.target.value});
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj marku automobila</h3>
        } else {
            return <h3 className="text-center">Izmeni marku automobila</h3>
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
                                        <label> Naziv marke: </label>
                                        <input placeholder="Naziv marke" name="nazivMarke" className="form-control"
                                            value={this.state.nazivMarke} onChange={this.changeNazivMarkeHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniMarku}>Sačuvaj</button>
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

export default InsertUpdateMarka;