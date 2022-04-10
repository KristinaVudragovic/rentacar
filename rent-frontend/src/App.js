import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/AuthService";

import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Home from "./components/common/Home";
import Profile from "./components/common/Profile";
import BoardUser from "./components/board/BoardUser";
import BoardZaposleni from "./components/board/BoardZaposleni";
import BoardAdmin from "./components/board/BoardAdmin";

import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Zaposleni from "./components/zaposleni/Zaposleni";
import InsertZaposleni from "./components/zaposleni/InsertZaposleni";
import ViewZaposleni from "./components/zaposleni/ViewZaposleni";
import Korisnik from "./components/korisnik/Korisnik";
import InsertUpdateKorisnik from "./components/korisnik/InsertUpdateKorisnik";
import ViewKorisnik from "./components/korisnik/ViewKorisnik";
import NacinPlacanja from "./components/nacinPlacanja/NacinPlacanja";
import InsertUpdateNP from "./components/nacinPlacanja/InsertUpdateNP";
import Tip from "./components/tip/Tip";
import InsertUpdateTip from "./components/tip/InsertUpdateTip";
import Marka from "./components/marka/Marka";
import InsertUpdateMarka from "./components/marka/InsertUpdateMarka";
import Model from "./components/model/Model";
import InsertUpdateModel from "./components/model/InsertUpdateModel";
import Automobil from "./components/automobil/Automobil";
import InsertUpdateAutomobil from "./components/automobil/InsertUpdateAutomobil";
import Rezervacija from "./components/rezervacija/Rezervacija";
import InsertUpdateRezervacija from "./components/rezervacija/InsertUpdateRezervacija";
import Faktura from "./components/faktura/Faktura";
import InsertUpdateFaktura from "./components/faktura/InsertUpdateFaktura";
import Main from "./components/common/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showZaposleniBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showZaposleniBoard: user.uloge.includes("ZAPOSLENI"),
        showAdminBoard: user.uloge.includes("ADMINISTRATOR"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showZaposleniBoard, showAdminBoard } = this.state;

    return (
      <div>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profil" component={Profile} />
            <Route path="/korisnik" component={BoardUser} />
            <Route path="/zaposleni" component={BoardZaposleni} />
            <Route path="/administrator" component={BoardAdmin} />

            <Route path="/nacinPlacanja" component={NacinPlacanja}></Route>
            <Route
              path="/insert-nacinPlacanja/:id"
              component={InsertUpdateNP}
            ></Route>
            <Route path="/tip" component={Tip}></Route>
            <Route path="/insert-tip/:id" component={InsertUpdateTip}></Route>
            <Route path="/marka" component={Marka}></Route>
            <Route
              path="/insert-marka/:id"
              component={InsertUpdateMarka}
            ></Route>
            <Route path="/model" component={Model}></Route>
            <Route
              path="/insert-model/:id"
              component={InsertUpdateModel}
            ></Route>
            <Route path="/automobil" component={Automobil}></Route>
            <Route
              path="/insert-automobil/:id"
              component={InsertUpdateAutomobil}
            ></Route>
            <Route path="/rezervacija" component={Rezervacija}></Route>
            <Route
              path="/insert-rezervacija/:id"
              component={InsertUpdateRezervacija}
            ></Route>
            <Route path="/faktura" component={Faktura}></Route>
            <Route
              path="/insert-faktura/:id"
              component={InsertUpdateFaktura}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
