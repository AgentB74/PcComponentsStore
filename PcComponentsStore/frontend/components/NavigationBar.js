import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Link to={""} className="navbar-brand">
                    {/*<img src="https://image.flaticon.com/icons/svg/566/566294.svg" width="45"*/}
                    {/*     height="45" alt="brand"/>*/}
                </Link>
                <Nav className="mr-auto" style={{"fontSize": "20px"}}>
                    <Link to={""} className="nav-link">Home</Link>
                    <Link to={"play"} className="nav-link">Play</Link>
                    <Link to={"games"} className="nav-link">All Games</Link>
                </Nav>
            </Navbar>

        );
    }
}

