import React from "react";
import {Card, Button, Table, ButtonGroup, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo, faList, faTrash, faSignInAlt, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

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
        quantity: 0,
        totalPrice: 0,
        myShow: false,
        orderId: 0,
    };

    componentWillMount() {
        console.log("componentDidMount()");
        axios.get("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({"items": data.items})
                this.setState({"cartId": data.id})
                this.setState({"totalPrice": data.total_cost})
            });
    }

    ordSubmit = event => {
        event.preventDefault();
        this.setState({"myShow": false})
        this.props.history.push('/')
    }

    plusQuantity = (itemQuan, itemId) => {
        console.log(itemQuan)
        // this.setState({"quantity": itemQuan})
        this.state.quantity = itemQuan
        console.log(this.state.quantity)
        this.setState({"quantity": this.state.quantity++})
        console.log(this.state.quantity)
        this.changeQuantity(itemId)
    }

    minusQuantity = (itemQuan, itemId) => {
        console.log(itemQuan)
        // this.setState({"quantity": itemQuan})
        this.state.quantity = itemQuan
        console.log(this.state.quantity)
        this.setState({"quantity": this.state.quantity--})
        console.log(this.state.quantity)
        this.changeQuantity(itemId)
    }

    reloadCart = () => {
        console.log("reload()");
        axios.get("http://127.0.0.1:8000/api/cart/" + this.state.userId)
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({"items": data.items})
                this.setState({"cartId": data.id})
                this.setState({"totalPrice": data.total_cost})
            });
    }


    changeQuantity = (itemId) => {
        console.log(this.state.quantity)

        if (this.state.quantity >= 1) {
            console.log(this.state.quantity)
            // this.setState({"quantity": event.target.value})
            axios.put("http://127.0.0.1:8000/api/cart/" + this.state.userId + "/" + itemId + "/" + this.state.quantity)
                // .then(response => console.log(response.data));
                .then(response => response.data)
                .then((data) => {
                    // this.setState({"totalPrice": data.quantity * data.price})
                    this.reloadCart()
                });
        } else {
            console.log("nope")
        }
    }

    deleteGood = (goodId) => {
        axios.delete("http://127.0.0.1:8000/api/cart/" + this.state.userId + "/" + goodId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        "items": this.state.items.filter(item => item.id !== goodId)
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
                    this.setState({"myShow": true});
                } else {
                    this.setState({"myShow": false})
                }
            })

    };

    switchState = (state) => {
        this.setState({"MyShow": state});
    }

    goHome = () => {
        this.props.history.push('/')
    };


    render() {
        return (
            <>
                <Card style={{marginLeft: "14%", marginTop: "35px", marginBottom: "35px"}}
                      className={"border border-light bg-light text-dark"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Корзина</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="light">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Количество товара</th>
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
                                            <td>{item.product.name}</td>
                                            <td>{item.product.description}</td>
                                            <td>
                                                <div style={{display: "flex", margin: "0 auto"}}>
                                                    <Button style={{width: "40px", height: "40px"}}
                                                            onClick={this.minusQuantity.bind(this, item.quantity, item.id)}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </Button>
                                                    <Form style={{width: "75px", height: "75px"}}>
                                                        <Form.Group as={Col} controlId="formBasicLogin">
                                                            <Form.Control
                                                                required autoComplete="off"
                                                                type="text"
                                                                name={"quantity"}
                                                                value={item.quantity}
                                                                onChange={this.accountChange}
                                                                className={"bg-light text-dark"}
                                                            />
                                                        </Form.Group>
                                                    </Form>
                                                    <Button
                                                        style={{width: "40px", height: "40px", marginRight: "-50px"}}
                                                        onClick={this.plusQuantity.bind(this, item.quantity, item.id)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </Button>
                                                    {/*<Form.Group controlId="exampleForm.SelectCustom">*/}
                                                    {/*    <Form.Label> </Form.Label>*/}
                                                    {/*    <Form.Control*/}
                                                    {/*        style={{overflowY: "scroll"}}*/}
                                                    {/*        as="select"*/}
                                                    {/*        onChange={this.changeQuantity.bind(this, item.id)}*/}
                                                    {/*        custom>*/}
                                                    {/*        /!*{elements.map((value, index) => {*!/*/}
                                                    {/*        /!*    <option value={value}>{value}</option>*!/*/}
                                                    {/*        /!*})}*!/*/}
                                                    {/*        <option value={item.quantity}>{item.quantity}</option>*/}
                                                    {/*        <option value={1}>1</option>*/}
                                                    {/*        <option value={2}>2</option>*/}
                                                    {/*        <option value={3}>3</option>*/}
                                                    {/*        <option value={4}>4</option>*/}
                                                    {/*        <option value={5}>5</option>*/}
                                                    {/*        /!*<option value={6}>6</option>*!/*/}
                                                    {/*        /!*<option value={7}>7</option>*!/*/}
                                                    {/*        /!*<option value={8}>8</option>*!/*/}
                                                    {/*    </Form.Control>*/}
                                                    {/*</Form.Group>*/}
                                                </div>
                                            </td>
                                            <td>{item.price}</td>
                                            <td>
                                                <ButtonGroup>
                                                    {/*<Button size={"sm"} variant={"outline-primary"}>*/}
                                                    {/*    <FontAwesomeIcon icon={faSignInAlt}/>*/}
                                                    {/*</Button>*/}
                                                    {/*{' '}*/}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteGood.bind(this, item.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        {
                            this.state.items.length === 0 ?
                                <Link to={"/products/1"}><h4>Выберите товары из каталога!</h4></Link>
                                :
                                <div>
                                    <h4>Итговая стоимость покупки: {this.state.totalPrice} руб.</h4>
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
                                </div>
                        }
                    </Card.Footer>
                </Card>
                <Modal onExit={this.goHome.bind(this)} show={this.state.myShow}
                       onHide={this.switchState.bind(this, false)}
                       centered
                       size={"sm"}>
                    <Form onSubmit={this.ordSubmit} id={"RegistrationFormId"}>
                        <Modal.Header closeButton>
                            <Modal.Title>Авторизация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    <Form.Label>Ваш заказ принят. Номер заказа {this.state.orderId}</Form.Label>
                                </Form.Group>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                ОК
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}