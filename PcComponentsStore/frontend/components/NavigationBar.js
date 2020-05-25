import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";

export default class NavigationBar extends React.Component {
    render() {
        const myFontSize = {
            fontSize: "20px"
        }
        const myFontSize2 = {
            fontSize: "22px"
            // marginLeft: "45%"
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
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={myFontSize}>
                        <Link to={"/computers/2/2"} className="nav-link">Компьютеры</Link>
                        <Link to={""} className="nav-link">Периферия</Link>
                        <Link to={""} className="nav-link">Комплектующие</Link>
                        <Link to={""} className="nav-link">Кабели</Link>
                        <Link to={"/products/2"} className="nav-link">Мониторы</Link>
                        <Link to={"/products"} className="nav-link">[TEST] Все товары</Link>
                        <NavDropdown title="..." id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Информация о сайте</NavDropdown.Item>
                            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav style={myFontSize2}>
                        {/*<Link to={"/basket"} className="nav-link"><FontAwesomeIcon icon={faShoppingBasket}/></Link>*/}
                        <Link to={""} className="nav-link"><FontAwesomeIcon style={{fontSize: "22px"}}
                                                                            icon={faSignInAlt}/></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

