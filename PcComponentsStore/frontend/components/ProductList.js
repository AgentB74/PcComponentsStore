import React from "react";
import {Navbar, Nav, NavDropdown, Card, Table, Jumbotron, Button} from "react-bootstrap";
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
            name: ""
        };
        this.state.id = this.props.match.params.categ_id
        console.log("constructor()");

    }

    componentWillMount() {
        console.log("componentDidMount()");
        axios.get("http://127.0.0.1:8000/api/products/" + this.state.id)
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({products: data})
                // this.setState({id: data.id})
                // this.setState({username: data.name})
            });
    }


    generateBoard = () => {
        let BR = [];
        if (this.state.products.length !== 0) {
            for (var i = 0; i < this.state.products.length; i++) {
                BR.push(
                    <Card className={""}>
                        {/*<Card.Header><FontAwesomeIcon icon={faList}/>LIST</Card.Header>*/}
                        {/*<Card.Img variant="top" src={"sas"}/>*/}
                        <Card.Body>
                            <Card.Title>{this.state.products[i].name}</Card.Title>
                            <Card.Text>{this.state.products[i].description}</Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>)
            }
        }
        return BR;
    };


    // get_prod_by_id = event => {
    //     event.preventDefault();
    //     if (this.state.size < 3) {
    //         alert("Поле не может быть больше чем 3")
    //     } else {
    //         axios.post("http://127.0.0.1:8000/api/products/2", {
    //             owner: this.state.owner,
    //             gameName: this.state.gameName,
    //             size: this.state.size
    //         }).then(response => {
    //             if (response.data != null) {
    //                 this.setState({"show": true});
    //                 this.setState({"type": "success"});
    //                 this.setState({"message": "Game created successfully!"});
    //                 setTimeout(() => this.setState({"show": false}), 2000);
    //             } else {
    //                 this.setState({"show": false});
    //                 this.setState({"type": "danger"});
    //                 this.setState({"message": "Error creating game"});
    //             }
    //         });
    //         this.setState(this.initialState);
    //         // setTimeout(() => this.props.history.push('/TicTacToeGame'), 1000);
    //     }
    // };


    render() {
        console.log("render()");
        const img = {
            heigth: "200px",
            width: "200px",
        }

        return (<Jumbotron className={"d-flex"}>
                {this.state.products.length === 0 ?
                    <h1>>NINE</h1> :
                    this.state.products.map((product) => (
                        <Card className={"border border-dark bg-dark text-white"}>
                            {/*<Card.Header><FontAwesomeIcon icon={faList}/>LIST</Card.Header>*/}
                            <Card.Img variant="top" src={product.image} alt={"img 200x200px"} style={img}/>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Button variant="primary">Добавить в корзину</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Jumbotron>
        );
    }
}