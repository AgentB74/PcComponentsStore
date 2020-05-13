import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
// import GameList from "./components/GameList";
// import CreateGame from "./components/CreateGame";
// import TicTacToeGame from "./components/TicTacToeGame"


// import './styles/App.css';

export default class App extends Component {
    render() {
        const marginTop = {
            marginTop: "20px"
        };
        return (
            <Router>
                <NavigationBar/>
                <Slider/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Switch>
                                <Route path="/" exact component={Welcome}/>
                                {/*<Route path="/play" exact component={CreateGame}/>*/}
                                {/*<Route path="/games" exact component={GameList}/>*/}
                                {/*<Route path="/TicTacToeGame" exact component={TicTacToeGame}/>*/}
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        );
    }
}