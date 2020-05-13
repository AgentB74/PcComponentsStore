import React from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Link to={""} className="navbar-brand">
                    {/*<img src="https://image.flaticon.com/icons/svg/566/566294.svg" width="45"*/}
                    {/*     height="45" alt="brand"/>*/}
                </Link>
            </Navbar>
        );
    }
}