import React from "react";
import {Link} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";

import Logo from '../../static/img/logo4.png'
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Header extends React.Component {
    render() {
        const color = {
            backgroundColor: '#ffffff',
            zIndex: 1,
        };
        const buttonStyle = {
            width: "200px",
            height: "100px",
            textAlign: "center",
            fontSize: "30px",
            backgroundColor: "#2eabef"
        }
        return (
            <Navbar className="d-flex" fixed="top" style={color}>
                <Nav className="mr-auto">
                    <Link to={""} className="navbar-brand">
                        <img src={Logo} width="160"
                             height="120" alt="brand"/>
                    </Link>
                    <p style={{marginTop: "10px"}}>
                        <h3>Время работы</h3>
                        00:00 - 00:00
                    </p>
                </Nav>
                <Nav>
                    <p style={{marginTop: "10px"}}>
                        <h3>e-mail</h3>
                        pisankin96@mail.ru
                    </p>
                    <Link to={"/basket"} className="nav-link">
                        <Button style={buttonStyle}>
                            <FontAwesomeIcon icon={faShoppingBasket}/> Корзина
                        </Button>
                    </Link>
                </Nav>
            </Navbar>
        );
    }
}