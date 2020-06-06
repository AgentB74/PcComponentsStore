import React from "react";
import {Button, Card, Col, Jumbotron} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

export default class NewsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }

    componentWillMount() {
        // console.log("componentWillMount()");
        axios.get("http://127.0.0.1:8000/api/news/")
            .then(response => response.data)
            .then((data) => {
                this.setState({news: data})
            });
    }


    render() {
        return (
            <div
                style={{width: "300px", height: "550px", position: "fixed", marginTop: "35px", overflowY: "scroll"}}>
                {
                    this.state.news.length === 0 ?
                        <Col style={{overflowY: "scroll"}}>
                            <Card className="text-black">
                                <Card.Header>Новостей нет</Card.Header>
                                <p>Следите за обновлениями!</p>
                            </Card>
                        </Col> :
                        this.state.news.map((newOne) => (
                            <Col style={{overflowY: "scroll", marginBottom: "20px"}}>
                                <Card className="text-black">
                                    <Card.Body>
                                        <Card.Title>Скидка на {newOne.product.name}</Card.Title>
                                        <Card.Text>{newOne.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={{pathname: `/product/${newOne.product.id}`}}>
                                        {/*    <Button href={"/product/"`${newOne.product.id}`} variant="primary">*/}
                                        <Button variant="primary">
                                            Перейти к товару
                                        </Button>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                }
            </div>
        );
    }
}
