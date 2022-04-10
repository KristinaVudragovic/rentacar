import React, { Component } from 'react';
import AutomobilService from '../../services/AutomobilService';
import {Form, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../common/Navbar';
import AuthService from '../../services/AuthService';

class Automobil extends Component {

    constructor(props) {
        super(props)

        this.state = {
            automobil : [],
            currentPage : 1,
            automobilPerPage: 4,
            search: "",
            sortType: 'asc'
        }
        this.insertAutomobil = this.insertAutomobil.bind(this);
        this.updateAutomobil = this.updateAutomobil.bind(this);
        this.deleteAutomobil = this.deleteAutomobil.bind(this);
		this.bookAutomobil = this.bookAutomobil.bind(this);
    }

    componentDidMount() {
        AutomobilService.getAutomobile().then((res) => {
            this.setState({ automobil: res.data });
        });
		const user = AuthService.getCurrentUser();
        if (user) {
			this.setState({
				currentUser: user,
			});
		}
    }
	
	bookAutomobil() {
		this.props.history.push('insert-rezervacija/_insert');
	}

    insertAutomobil() {
        this.props.history.push('insert-automobil/_insert');
    }

    updateAutomobil(id) {
        this.props.history.push(`/insert-automobil/${id}`);
    }

    deleteAutomobil(id) {
        AutomobilService.deleteAutomobil(id).then ( res => {
            this.setState({automobil: this.state.automobil.filter(automobil => automobil.id !== id)});
        });
    }

    updateSearch(event) {
        this.setState({search:event.target.value.substr(0,20)});
    }

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage =() =>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage:1
            });
        }
    };

    prevPage =() =>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage: this.state.currentPage -1
            });
        }
    };

    lastPage =() =>{
        if(this.state.currentPage < Math.ceil(this.state.automobil.length / this.state.automobilPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.automobil.length / this.state.automobilPerPage)
            });
        }
    };

    nextPage =() =>{
        if(this.state.currentPage < Math.ceil(this.state.automobil.length / this.state.automobilPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    sort = ()=> {
        this.setState({sortType:this.state.sortType});
    }

    render() {

		const {currentUser} = this.state;
        const{automobil, currentPage, automobilPerPage}= this.state;

        let filteredAutomobil = automobil.filter(
            (automobil) => {
                return automobil.tip.nazivTipa.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
          )

        const lastIndex = currentPage * automobilPerPage;
        const firstIndex = lastIndex - automobilPerPage;
        const currentAutomobil = filteredAutomobil.slice(firstIndex,lastIndex);
        const totalPages = Math.ceil(automobil.length / automobilPerPage);

        const renderCard = (currentAutomobil, index) => {
            return (
               
                <div className="card border-secondary  3 text-center" style={{"maxWidth": "25rem","marginLeft":"50px "}} key={index}  >
                  <div className="card-header">{currentAutomobil.tip.nazivTipa} </div>
                <div className="card-body" >
                   <div className="card-title">Model: {currentAutomobil.model.nazivModela}</div>
                   <div className="card-title">Broj šasije: {currentAutomobil.brojSasije}</div>
                   <div className="card-title">Kubikaža: {currentAutomobil.kubikaza}</div>
                   <div className="card-title">Konjska snaga: {currentAutomobil.konjskaSnaga}</div>
                   <div className="card-title">Cena po danu: {currentAutomobil.cenaPoDanu + ".00 RSD"}</div> 
				   {currentUser && (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[0] === "ZAPOSLENI" || currentUser.uloge[0] === "KORISNIK" ) && (
				   <div>
                        <button onClick={ () => this.bookAutomobil(currentAutomobil.id)} className="btn btn-info" style={{ marginBottom:"10px" }} >Rezerviši </button>
					</div>
				   )}
				   {currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
						<div>
							<button style={{marginLeft: "10px"}} onClick={ () => this.updateAutomobil(currentAutomobil.id)} className="btn btn-info">Izmeni</button>
							<button style={{marginLeft: "10px"}} onClick={ () => this.deleteAutomobil(currentAutomobil.id)} className="btn btn-danger">Obriši</button>
						</div>
                   )}
                </div>
              </div>
            );
        };

        return (
            <div>
                <Navbar />
                <Form inline>
                <FormControl type="text" placeholder="Naziv tipa automobila"  className="mr-sm-2" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <Button variant="outline-primary">Pretraga</Button>
                </Form>
                <h1 className = "text-center"> Lista automobila</h1>
				{currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
                <div className="btn btn-primary" onClick={this.insertAutomobil}> Dodaj automobil</div>
				)}
                <div className=" card-columns grid">{currentAutomobil.map(renderCard)}
               </div>

               <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl  className={"page-num bg-light"} name="currentPage" value={currentPage}
                                    onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
            </div>
        );
    }
}

export default Automobil;