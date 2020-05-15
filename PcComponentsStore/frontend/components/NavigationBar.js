import React from "react";
import {Navbar, Nav, Jumbotron} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";

export default class NavigationBar extends React.Component {
    render() {
        const myFontSize = {
            fontSize: "20px"
        }
        const myFontSize2 = {
            fontSize: "22px",
            marginLeft: "50%"
        }
        const myMargin = {
            marginTop: "145px",
        }
        return (
            <Navbar bg="primary" variant="dark" style={myMargin}>
                {/*<Link to={""} className="navbar-brand">*/}
                {/*    /!*<img src="https://image.flaticon.com/icons/svg/566/566294.svg" width="45"*!/*/}
                {/*    /!*     height="45" alt="brand"/>*!/*/}
                {/*</Link>*/}
                <Nav className="mr-auto" style={myFontSize}>
                    <Link to={""} className="nav-link">Компьютеры</Link>
                    <Link to={""} className="nav-link">Периферия</Link>
                    <Link to={""} className="nav-link">Комплектующие</Link>
                    <Link to={""} className="nav-link">Кабели</Link>
                    <Link to={""} className="nav-link">Мониторы</Link>
                    <Link to={""} className="nav-link">...</Link>

                </Nav>
                <Nav className="mr-auto" style={myFontSize2}>
                    <Link to={""} className="nav-link"><FontAwesomeIcon icon={faHome}/></Link>
                </Nav>
            </Navbar>
        );
    }
}

