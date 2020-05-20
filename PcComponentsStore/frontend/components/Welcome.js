import React from "react";
import {Jumbotron, Button, Col, Container} from "react-bootstrap";
import Slider from "./Slider";
import {BrowserRouter as Router} from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        const margin = {
            marginTop: "35px",
            marginLeft: "535px"
        };
        const color = {
            backgroundColor: '#46a5f2'
        };
        const test = {
            marginLeft: "70%",
        };
        return (
            <Container>
                <Slider/>
                <Col lg={6} style={margin}>
                    <Jumbotron style={color} className=" text-white">
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
