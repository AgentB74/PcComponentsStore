import React from "react";
import {Navbar, Nav, NavDropdown, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import axios from "axios";
import Logo from "../../static/img/Logo4.png";
// import Col from "react-bootstrap/Col";

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: "",
            name: ""
        };
    }

    // componentDidMount() {
    //     console.log("componentDidMount()");
    //     axios.get("http://127.0.0.1:8000/api/products/")
    //         // .then(response => console.log(response.data));
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({products: data})
    //             this.setState({id: data.id})
    //             this.setState({username: data.name})
    //         });
    // }

    get_prod_by_id = event => {
        event.preventDefault();
        if (this.state.size < 3) {
            alert("Поле не может быть больше чем 3")
        } else {
            axios.post("http://127.0.0.1:8000/api/products/2", {
                owner: this.state.owner,
                gameName: this.state.gameName,
                size: this.state.size
            }).then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    this.setState({"type": "success"});
                    this.setState({"message": "Game created successfully!"});
                    setTimeout(() => this.setState({"show": false}), 2000);
                } else {
                    this.setState({"show": false});
                    this.setState({"type": "danger"});
                    this.setState({"message": "Error creating game"});
                }
            });
            this.setState(this.initialState);
            // setTimeout(() => this.props.history.push('/TicTacToeGame'), 1000);
        }
    };

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> User List</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Categ ID</th>
                            <th>Image</th>
                            <th>Descr</th>
                            <th>Board size</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products.length === 0 ?
                                <tr align="center">
                                    < td colSpan={"7"}>There is no games</td>
                                </tr> :
                                this.state.products.map((product) => (
                                    <tr align="center" key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td><img src={product.image} width="160"
                                                 height="120" alt="brand"/></td>
                                        <td>{product.description}</td>
                                        <td>{this.state.id}</td>
                                        <td>
                                            {/*<ButtonGroup>*/}
                                            {/*<Button size={"sm"} variant={"outline-primary"}*/}
                                            {/*        onClick={this.plusGamer}>*/}
                                            {/*    <FontAwesomeIcon icon={faSignInAlt}/>*/}
                                            {/*</Button>*/}
                                            {/*{' '}*/}
                                            {/*<Button size={"sm"} variant={"outline-danger"}*/}
                                            {/*        onClick={this.deleteGame.bind(this, product.id)}>*/}
                                            {/*    <FontAwesomeIcon icon={faTrash}/>*/}
                                            {/*</Button>*/}
                                            {/*</ButtonGroup>*/}
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}