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
        items: [],
        userId: 1,
        show: false,
        cartId: 0,
    };

    componentWillMount() {
        console.log("componentDidMount()");
        axios.get("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({"items": data.items})
                this.setState({"cartId": data.id})
            });
    }

    deleteGood = (goodId) => {
        axios.delete("http://127.0.0.1:8000/api/cart/" + this.state.userId + "/" + goodId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        "products": this.state.products.filter(product => product.id !== goodId)
                    });
                } else {
                    this.setState({"show": false})
                }
            })
        console.log(goodId)
    };

    deleteAllGoods = () => {
        axios.delete("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    this.setState(() => this.initialState);
                    setTimeout(() => this.setState({"show": false}), 2000);
                } else {
                    this.setState({"show": false})
                }
            })
    };

    createOrder = () => {
        axios.post("http://127.0.0.1:8000/api/order/create/" + this.state.userId)
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
            <Card style={{marginLeft: "14%", marginTop: "35px",}} className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Корзина</Card.Header>
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
                            this.state.items.length === 0 ?
                                <tr align="center">
                                    < td colSpan={"7"}>Ваша корзина пуста!</td>
                                </tr> :
                                this.state.items.map((item) => (
                                    <tr align="center" key={item.id}>
                                        <td>{item.id}</td>
                                        {/*<td>{item.id}</td>*/}
                                        {/*<td>{item.id}</td>*/}
                                        <td>{item.product.name}</td>
                                        <td>{item.product.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}>
                                                    <FontAwesomeIcon icon={faSignInAlt}/>
                                                </Button>
                                                {' '}
                                                <Button size={"sm"} variant={"outline-danger"}
                                                        onClick={this.deleteGood.bind(this, item.id)}>
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
                <Card.Footer>
                    {
                        this.state.items.length === 0 ?
                            <Button size={"sm"} variant={"outline-danger"}
                                    onClick={this.createOrder.bind(this, 1)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                            :
                            <ButtonGroup>
                                <Button size={"sm"} variant={"outline-primary"}
                                        onClick={this.createOrder.bind()}>
                                    <FontAwesomeIcon icon={faSignInAlt}/> Оформить заказ
                                </Button>
                                {' '}
                                <Button size={"sm"} variant={"outline-danger"}
                                        onClick={this.deleteAllGoods.bind()}>
                                    <FontAwesomeIcon icon={faTrash}/> Отчистить корзину
                                </Button>
                            </ButtonGroup>
                    }
                </Card.Footer>
            </Card>
        );
    }
}