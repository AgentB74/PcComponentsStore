import React from "react";
import {Button, Col, Jumbotron,} from "react-bootstrap";

export default class NewsBar extends React.Component {
    render() {

        return (
            <div className={"d-flex"} style={{width: "300px", height: "550px", position: "fixed", marginTop: "35px", overflowY: "scroll"}}>
                <Col style={{overflowY: "scroll"}}>
                    <Jumbotron className="text-black">
                        <h2>НОВОСТИ #1</h2>
                        <p>ЖИТЕЛИ КОРОНОВИРУС-ВИЛЯ ЗАРАХИЛИСЬ КОРОНОВИРУСОМ{"\n"}</p>
                        <p>ЧЕКАЙ БЫСТРЕЕ. ССЫЛКА В ОПИСАНИИ.</p>
                        <p> НОМЕР БАНКОВСКОЙ КАРТЫ КИНЬ!</p>
                    </Jumbotron>
                    <Jumbotron className="text-black">
                        <h2>НОВОСТИ #2</h2>
                        <p>ЖИТЕЛИ КОРОНОВИРУС-ВИЛЯ ЗАРАХИЛИСЬ КОРОНОВИРУСОМ{"\n"}</p>
                        <p>ЧЕКАЙ БЫСТРЕЕ. ССЫЛКА В ОПИСАНИИ.</p>
                        <p> НОМЕР БАНКОВСКОЙ КАРТЫ КИНЬ!</p>
                    </Jumbotron>
                    <Jumbotron className="text-black">
                        <h2>НОВОСТИ #3</h2>
                        <p>ЖИТЕЛИ КОРОНОВИРУС-ВИЛЯ ЗАРАХИЛИСЬ КОРОНОВИРУСОМ{"\n"}</p>
                        <p>ЧЕКАЙ БЫСТРЕЕ. ССЫЛКА В ОПИСАНИИ.</p>
                        <p> НОМЕР БАНКОВСКОЙ КАРТЫ КИНЬ!</p>
                    </Jumbotron>
                </Col>
            </div>
        );
    }
}
