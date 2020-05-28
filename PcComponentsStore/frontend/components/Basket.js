import React from "react";
import {Card, Button, Table, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo, faList, faTrash, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        products: [],
        userId: 0,
        show: false,
    };

    componentWillMount() {
        console.log("componentDidMount()");
        axios.get("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({products: data.product})
            });
    }

    deleteGood = (goodId) => {
        // axios.delete("http://127.0.0.1:8000/api/cart/" + gameId+"/"+goodId)
        //     .then(response => {
        //         if (response.data != null) {
        //             this.setState({"show": true});
        //             setTimeout(() => this.setState({"show": false}), 3000);
        //             this.setState({
        //                 games: this.state.games.filter(game => game.id !== gameId)
        //             });
        //         } else {
        //             this.setState({"show": false})
        //         }
        //     })
        console.log(goodId)
    };

    deleteAllGoods = () => {
        axios.delete("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState(() => this.initialState);
                } else {
                    this.setState({"show": false})
                }
            })
    };

    createOrder = (userId) => {
        axios.post("http://127.0.0.1:8000/api/order/" + this.state.userId)
            .then(response => {
                if (response.data != null) {
                    this.setState(() => this.initialState);
                    setTimeout(() => this.props.history.push('/'), 1500);
                } else {
                    this.setState({"show": false})
                }
            })
    };


    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/>Корзина</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products.length === 0 ?
                                <tr align="center">
                                    < td colSpan={"7"}>Ваша корзина пуста!</td>
                                </tr> :
                                this.state.games.map((product) => (
                                    <tr align="center" key={product.id}>
                                        <td>{product.pk}</td>
                                        <td>{product.id}</td>
                                        <td>{product.email}</td>
                                        <td>{product.email}</td>
                                        <td>{product.email}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}
                                                        onClick={this.plusGamer()}>
                                                    <FontAwesomeIcon icon={faSignInAlt}/>
                                                </Button>
                                                {' '}
                                                <Button size={"sm"} variant={"outline-danger"}
                                                        onClick={this.deleteGood.bind(this, product.pk)}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </ButtonGroup>
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