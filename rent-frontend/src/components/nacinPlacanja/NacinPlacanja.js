import React, { Component } from 'react';
import NacinPlacanjaService from '../../services/NacinPlacanjaService';
import AuthService from '../../services/AuthService';

class NacinPlacanja extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nacinPlacanja : []
        }
        this.insertNacinPlacanja = this.insertNacinPlacanja.bind(this);
        this.updateNacinPlacanja = this.updateNacinPlacanja.bind(this);
        this.deleteNacinPlacanja = this.deleteNacinPlacanja.bind(this);
		this.izaberi = this.izaberi.bind(this);
    }

    componentDidMount() {
        NacinPlacanjaService.getNacinePlacanja().then((res) => {
            this.setState({ nacinPlacanja: res.data });
        });
		const user = AuthService.getCurrentUser();
        if (user) {
			this.setState({
				currentUser: user,
			});
		}
    }
	
	izaberi() {
		this.props.history.push('faktura');
	}
	
    insertNacinPlacanja() {
        this.props.history.push('insert-nacinPlacanja/_insert');
    }

    updateNacinPlacanja(id) {
        this.props.history.push(`/insert-nacinPlacanja/${id}`);
    }

    deleteNacinPlacanja(id) {
        NacinPlacanjaService.deleteNacinPlacanja(id).then ( res => {
            this.setState({nacinPlacanja: this.state.nacinPlacanja.filter(nacinPlacanja => nacinPlacanja.id !== id)});
        });
    }

    render() {
		
		const {currentUser} = this.state;
		
        return (
            <div>
                <h2 className = "text-center">Načini plaćanja</h2>
                <div className="row">
				{currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
                    <button className="btn btn-primary" onClick={this.insertNacinPlacanja}>Dodaj način plaćanja</button>
				)}
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Naziv plaćanja</th>
                                <th>Opcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.nacinPlacanja.map(
                                    nacinPlacanja =>
                                    <tr key = {nacinPlacanja.id}>
                                        <td>{nacinPlacanja.nazivPlacanja}</td>
											{/*{currentUser && (currentUser.uloge[0] === "KORISNIK") && (*/}
                                        <td>
										
											<button onClick={ () => this.izaberi(nacinPlacanja.id)} className="btn btn-info" style={{ marginBottom:"10px" }} >Izaberi </button>	
												{/*{currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
                                            <button onClick={ () => this.updateNacinPlacanja(nacinPlacanja.id)} className="btn btn-info">Izmeni</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteNacinPlacanja(nacinPlacanja.id)} className="btn btn-danger">Obriši</button>
							)} */}
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

export default NacinPlacanja;