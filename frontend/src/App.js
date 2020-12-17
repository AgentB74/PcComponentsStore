import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Basket from "../components/Basket";
import NewsBar from "../components/NewsBar";
import ProductList from "../components/ProductList";
import Registration from "../components/Registration";
import ProductDetail from "../components/ProductDetail";


// import './styles/App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
    }

    // componentDidMount(key) {
    //     console.log("sas")
    //     localStorage.setItem('id', 11)
    //     console.log(localStorage.getItem('id'))
    //
    // //     if (this.state.logged_in) {
    // //         fetch('http://127.0.0.1:8000/users/MyLogin2/', {
    // //             headers: {
    // //                 Authorization: `JWT ${localStorage.getItem('token')}`
    // //             }
    // //         })
    // //             .then(res => res.json())
    // //             .then(json => {
    // //                 this.setState({username: json.username});
    // //             });
    // //     }
    // }

    handle_login = (e, data) => {
        e.preventDefault();
        // fetch('http://127.0.0.1:8000/users/MyLogin/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(json => {
        //         localStorage.setItem('token', json.token);
        //         this.setState({
        //             logged_in: true,
        //             displayed_form: '',
        //             username: json.user.username
        //         });
        //     });
        console.log("sasasas")
        // console.log(localStorage.getItem('token'))
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({logged_in: false, username: ''});
    };

    render() {
        const marginTop = {
            marginTop: "20px"
        };
        return (
            <Router>
                <Header/>
                <NavigationBar name={this.handle_login}/>
                <NewsBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Switch>
                                <Route path="/" exact component={Welcome}/>
                                {/*<Route path="/play" exact component={CreateGame}/>*/}
                                {/*<Route path="/games" exact component={GameList}/>*/}
                                {/*<Route path="/TicTacToeGame" exact component={TicTacToeGame}/>*/}
                                <Route path="/basket" exact component={Basket}/>
                                <Route path="/registration" exact component={Registration}/>
                                <Route path="/product/:prod_id" exact component={ProductDetail}/>
                                <Route path="/products/:categ_id" component={ProductList}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        );
    }
}