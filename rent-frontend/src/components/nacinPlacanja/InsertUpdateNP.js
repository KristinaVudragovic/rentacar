import React, { Component } from 'react';
import NacinPlacanjaService from '../../services/NacinPlacanjaService';

class InsertUpdateNP extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nazivPlacanja: ''
        }
        this.changeNazivPlacanjaHandler = this.changeNazivPlacanjaHandler.bind(this);
        this.sacuvajIzmeniNacinPlacanja = this.sacuvajIzmeniNacinPlacanja.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_insert'){
            return
        } else {
            NacinPlacanjaService.getNacinPlacanjaById(this.state.id).then( (res) => {
                let nacinPlacanja = res.data;
                this.setState({nazivPlacanja: nacinPlacanja.nazivPlacanja});                
            });
        }
    }

    sacuvajIzmeniNacinPlacanja = (e) => {
        e.preventDefault();
        let nacinPlacanja = {nazivPlacanja: this.state.nazivPlacanja};
        console.log('nacinPlacanja => ' + JSON.stringify(nacinPlacanja));

        if(this.state.id === '_insert'){
            NacinPlacanjaService.insertNacinPlacanja(nacinPlacanja).then(res =>{
                this.props.history.push('/nacinPlacanja');
            });
        } else {
            NacinPlacanjaService.updateNacinPlacanja(nacinPlacanja, this.state.id).then(res => {
                this.props.history.push('/nacinPlacanja');
            });
        }
    }

    changeNazivPlacanjaHandler = (event) => {
        this.setState ({nazivPlacanja: event.target.value});
    }

    otkazi () {
        this.props.history.push('/nacinPlacanja');
    }

    getNaziv() {
        if(this.state.id === '_insert') {
            return <h3 className="text-center">Dodaj način plaćanja</h3>
        } else {
            return <h3 className="text-center">Izmeni način plaćanja</h3>
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
                                        <label> Naziv načina plaćanja: </label>
                                        <input placeholder="Naziv načina plaćanja" name="nazivPlacanja" className="form-control"
                                            value={this.state.nazivPlacanja} onChange={this.changeNazivPlacanjaHandler}></input>
                                    </div>

                                    <button className="btn btn-success" onClick={this.sacuvajIzmeniNacinPlacanja}>Sačuvaj</button>
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

export default InsertUpdateNP;