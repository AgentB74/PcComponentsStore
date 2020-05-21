import React from "react";
import {Jumbotron, Button, Col, Container} from "react-bootstrap";
import Slider from "./Slider";
import {BrowserRouter as Router} from "react-router-dom";
import Logo2 from "../../static/img/Logo2.png";

export default class Welcome extends React.Component {
    render() {
        const margin = {
            // margin: "auto",
            // marginTop: "35px",
            // paddingTop: "40px",
            // paddingBottom: "40px",
            marginLeft: "15%",
            backgroundColor: '#46a5f2',
            width: "500px"
        };
        const color = {
            backgroundColor: '#46a5f2'
        };
        const test = {
            marginLeft: "70%",
        };
        return (
            <Container style={{marginLeft: "12%"}}>
                <Slider/>
                <Col className={"d-flex"} style={{marginTop: "45px", marginLeft: "80px"}} lg={12}>
                    <img style={{marginTop: "35px"}} src={Logo2} width="260"
                         height="250" alt="brand"/>
                    <Jumbotron style={margin} className=" text-white">
                        <h1>Hello, User!</h1>
                        <p>
                            Добро пожаловать в магазин компьютерных комплектующих!{"\n"}
                            Этот сайт был создан для более удобного выбора частей ПК!
                        </p>
                        <Button style={test} variant="light">Подробнее</Button>
                    </Jumbotron>
                </Col>
            </Container>
        );
    }
}
