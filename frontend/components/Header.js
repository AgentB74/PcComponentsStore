import React from "react";
import {Link} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";

import Logo from '../../static/img/logo4.png'
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MyToast from "./MyToast";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        ToastShow: false, ToastType: "", ToastMessage: ""
    }

    MyAlert = () => {
        this.setState({"ToastShow": true});
        this.setState({"ToastType": "danger"});
        this.setState({"ToastMessage": "Пожалуйста авторизируйтесь!"});
        setTimeout(() => this.setState({"ToastShow": false}), 2500);
    }

    render() {
        const myNavbarStyle = {
            backgroundColor: '#ffffff',
            zIndex: 1,
            boxShadow: "3px 3px 20px 5px #d0cece",
        };
        const buttonStyle = {
            width: "200px",
            height: "100px",
            textAlign: "center",
            fontSize: "30px",
            backgroundColor: "#2eabef"
        }
        return (
            <div>
                <div style={{"display": this.state.ToastShow ? "block" : "none"}}>
                    <MyToast children={{
                        show: this.state.ToastShow, message: this.state.ToastMessage,
                        type: this.state.ToastType
                    }}/>
                </div>
                <Navbar className="d-flex" fixed="top" style={myNavbarStyle}>
                    <Nav className="mr-auto">
                        <Link to={""} className="navbar-brand">
                            <img src={Logo} width="160"
                                 height="120" alt="brand"/>
                        </Link>
                        <p style={{marginTop: "10px"}}>
                            <h3>Время работы</h3>
                            8:00 - 22:00
                        </p>
                    </Nav>
                    <Nav>
                        <p style={{marginTop: "10px"}}>
                            <h3>e-mail</h3>
                            pisankin96@mail.ru
                        </p>
                        {localStorage.getItem('id') !== '0' ?
                            <Link to={"/basket"} className="nav-link">
                                <Button style={buttonStyle}>
                                    <FontAwesomeIcon icon={faShoppingBasket}/> Корзина
                                </Button>
                            </Link>
                            :
                            <Link className="nav-link" onClick={this.MyAlert.bind(this)}>
                                <Button style={buttonStyle}>
                                    <FontAwesomeIcon icon={faShoppingBasket}/> Корзина
                                </Button>
                            </Link>
                        }
                    </Nav>
                </Navbar>
            </div>
        );
    }
}