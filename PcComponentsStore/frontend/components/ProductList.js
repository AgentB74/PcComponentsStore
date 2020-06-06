import React from "react";
import {Card, Jumbotron, Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import axios from "axios";
import Logo from "../../static/img/Logo4.png";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
// import Col from "react-bootstrap/Col";

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: "",
            name: "",
            userId: 1,
            quantity: 1
        };
        this.state.id = this.props.match.params.categ_id
        console.log("constructor()");
    }

    componentWillMount() {
        console.log("componentWillMount()");
        axios.get("http://127.0.0.1:8000/api/products/" + this.state.id)
            .then(response => response.data)
            .then((data) => {
                this.setState({products: data})
            });
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("componentWillReceiveProps()");
    //     console.log(nextProps)
    // }

    componentWillUnmount() {
        console.log("componentWillUnmount()");
    }

    // componentWillUpdate() {
    //     console.log("componentWillUpdate()");
    //     // this.setState({"id":})
    //     console.log(this.props.match.params.categ_id)
    // }

    // componentDidUpdate() {
    //     console.log("componentDidUpdate()");
    //     this.setState({"id": this.props.match.params.categ_id})
    //     console.log(this.props.match.params.categ_id)
    // }

    inBasket = (goodId, goodPrice) => {
        axios.post("http://127.0.0.1:8000/api/cart/add/" + this.state.userId, {
            cart: this.state.userId,
            product: goodId,
            quantity: this.state.quantity,
            price: goodPrice
        })
            .then(response => {
                if (response.data != null) {
                    // this.setState({"show": true});
                    this.setState(() => this.initialState);
                    // setTimeout(() => this.setState({"show": false}), 2000);
                } else {
                    // this.setState({"show": false})
                }
            })
    };

    changeQuantity = (event) => {
        this.setState({"quantity": event.target.value})
    };


    generateBoard = () => {
        let BR = [];
        if (this.state.products.length !== 0) {
            for (var i = 0; i < this.state.products.length; i += 4) {
                let str = []
                for (var j = i; j < 4; j++) {
                    str.push(
                        <Card style={{display: "flex"}} className={"border border-dark bg-dark text-white"}>
                            {/*<Card.Header><FontAwesomeIcon icon={faList}/>LIST</Card.Header>*/}
                            <Card.Img variant="top" src={this.state.products[j].image} alt={"img 200x200px"}
                                      style={img}/>
                            <Card.Body>
                                <Card.Title>{this.state.products[j].name}</Card.Title>
                                <Card.Text>{this.state.products[j].description}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>)

                }
                BR.push(<div className={"sas"}> {str} </div>);
            }
        }
        return BR;
    };

    render() {
        console.log("render()");
        const img = {
            height: "190px",
            width: "222px",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
        }
        return (
            <Jumbotron
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: "14%",
                    marginTop: "35px",
                    width: "1040px",
                    backgroundColor: "#f6f6f6"
                }}>
                {this.state.products.length === 0 ?
                    <h1>Товаров нет. Загляните позже и обязательно следите за обновлениями!</h1> :
                    this.state.products.map((product) => (
                        <Card style={{width: '14rem', marginRight: "20px", marginBottom: "20px"}} className={"d-flex"}>
                            {/*<Card.Header><FontAwesomeIcon icon={faList}/>LIST</Card.Header>*/}
                            <Card.Img src={product.image} alt={"img 200x200px"} style={img}/>
                            <Card.Body style={{height: "150px"}}>
                                <Card.Title style={{fontSize: "15px"}}>
                                    <Link to={{pathname: `/product/${product.id}`}}>
                                        {product.name}
                                    </Link>
                                </Card.Title>
                                <Card.Text>{product.price} руб.</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
                                <Button variant="primary" onClick={this.inBasket.bind(this, product.id, product.price)}>
                                    В корзину
                                </Button>
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label> </Form.Label>
                                        <Form.Control
                                            style={{overflowY: "scroll"}}
                                            as="select"
                                            onChange={this.changeQuantity.bind()}
                                            custom>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            {/*<option value={6}>6</option>*/}
                                            {/*<option value={7}>7</option>*/}
                                            {/*<option value={8}>8</option>*/}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Card.Footer>
                        </Card>
                    ))
                }
            </Jumbotron>
        );
    }
}

