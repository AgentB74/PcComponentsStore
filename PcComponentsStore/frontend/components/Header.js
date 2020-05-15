import React from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";

import Logo from '../../static/img/logo4.png'

export default class Header extends React.Component {
    render() {
        const color = {
            backgroundColor: '#ffffff'
        };
        return (
            <Navbar className="d-flex" fixed="top" style={color}>
                <Link to={""} className="navbar-brand">
                    <img src={Logo} width="160"
                         height="120" alt="brand"/>
                </Link>
                <p>
                    <h3>Время работы</h3>
                    00:00 - 00:00
                </p>
                <Link> </Link>
            </Navbar>
        );
    }
}