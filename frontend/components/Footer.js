import React from "react";
import {Col, Navbar, Container} from "react-bootstrap";
import {faCopyright} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
// sticky="bottom"
        return (
            <Navbar fixed="bottom" variant="dark" style={{backgroundColor: "#2eabef"}}>
                <Container>
                    <Col lg={12} className="text-white text-center">
                        <div>
                            {fullYear} - {fullYear + 1}, All Rights Reserved By AgentB74
                            <FontAwesomeIcon style={{fontSize: "20px"}} icon={faCopyright}/>
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}