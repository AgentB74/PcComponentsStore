import React from "react";
import {Col, Navbar, Container} from "react-bootstrap";

export default class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
// sticky="bottom"
        return (
            <Navbar fixed="bottom" bg="primary" variant="dark">
                <Container>
                    <Col lg={12} className="text-white text-center">
                        <div>
                            {fullYear} - {fullYear + 1}, All Rights Reserved By AgentB74
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}