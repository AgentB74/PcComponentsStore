import React from "react";
import {Card, Button, Table, ButtonGroup, Form, Modal, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faSignInAlt,
    faPlus,
    faMinus,
    faLongArrowAltLeft, faCross, faTimes
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

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
        sumQuantity: 0,
        totalPrice: 0,
        myShow: false,
        orderId: 0,
    };

    componentWillMount() {
        console.log("componentDidMount()");
        this.state.userId = localStorage.getItem('id')
        if (this.state.userId !== 0) {
            axios.get("http://127.0.0.1:8000/api/cart/" + this.state.userId)
                // .then(response => console.log(response.data));
                .then(response => response.data)
                .then((data) => {
                    this.setState({"items": data.items})
                    this.setState({"cartId": data.id})
                    this.setState({"totalPrice": data.total_cost})
                    let temp3 = 0
                    let temp2 = this.state.sumQuantity
                    this.state.items.map(function (item) {
                        temp3 = item.quantity + temp2
                        temp2 = temp3
                    })
                    console.log(temp3)
                    this.setState({"sumQuantity": temp3})
                });
        }
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
                this.setState({"sumQuantity": 0})
                let temp3 = 0
                let temp2 = this.state.sumQuantity
                this.state.items.map(function (item) {
                    temp3 = item.quantity + temp2
                    temp2 = temp3
                })
                console.log(temp3)
                this.setState({"sumQuantity": temp3})
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
                    this.reloadCart()
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
            // .then(response => {
            //     if (response.data != null) {
            //
            //         this.setState({"myShow": true});
            //     } else {
            //         this.setState({"myShow": false})
            //     }
            // })
            .then(response => response.data)
            .then((data) => {
                this.setState({"orderId": data})
                this.setState({"myShow": true})
                this.reloadCart()
            });

    };

    switchState = (state) => {
        this.setState({"MyShow": state});
    }

    goHome = () => {
        this.setState(() => this.initialState);
        this.props.history.push('/')
    };

    render() {
        const hstyle = {
            marginLeft: "15%",
            marginTop: "1%",
            // backgroundColor: "#ecebeb",
        }

        return (
            <div>
                {localStorage.getItem('id') === '0' ?
                    <div style={hstyle}>
                        <h1>Для входа, пожалуйста, авторизируйтесь</h1>
                    </div> :
                    <div style={{marginBottom: "10%"}}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "14%",
                            marginTop: "1%",
                            width: "90%"
                        }}>
                            <div><h1>Ваш заказ</h1></div>
                            <div style={{marginLeft: "auto"}}>
                                <a href="/products/1">
                                    <Button variant="outline-primary" style={{
                                        width: "200px",
                                        height: "65px",
                                        fontSize: "25px",
                                        borderRadius: "12px",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            verticalAlign: "center",
                                            // position: "absolute"
                                        }}>
                                            <FontAwesomeIcon icon={faLongArrowAltLeft} style={{
                                                marginRight: "5%",
                                                background: "",
                                                fontSize: "30px",
                                            }}/>
                                            <div><p style={{marginBottom: "0"}}>В магазин</p></div>
                                        </div>
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <Card style={{
                            width: "90%",
                            marginLeft: "14%",
                            marginTop: "35px",
                            marginBottom: "2%",
                        }}>
                            <div>
                                {
                                    this.state.items.length === 0 ?
                                        <div style={{textAlign: "center", margin: "10% 1px 10% 1px"}}><h1>Корзина
                                            пуста</h1></div>
                                        :
                                        <Card.Body>
                                            <Table bordered striped hover variant="light"
                                                   style={{
                                                       fontSize: "20px",
                                                       textAlign: "center",
                                                       background: "#ffffff"
                                                   }}>
                                                <thead>
                                                <tr>
                                                    <th style={{border: "1px solid #ecebeb"}}></th>
                                                    <th style={{border: "1px solid #ecebeb"}}>Название</th>
                                                    {/*<th>Описание</th>*/}
                                                    <th style={{border: "1px solid #ecebeb"}}>Количество</th>
                                                    <th style={{border: "1px solid #ecebeb"}}>Цена</th>
                                                    <th style={{border: "1px solid #ecebeb"}}></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.items.map((item) => (
                                                        <tr align="center" key={item.id}>
                                                            <td class="align-middle"
                                                                style={{border: "1px solid #ecebeb"}}>
                                                                <img style={{width: "140px", height: "100px"}}
                                                                     src={item.product.image} alt="product"/></td>
                                                            <td class="align-middle"
                                                                style={{border: "1px solid #ecebeb"}}>{item.product.name}</td>
                                                            {/*<td>{item.product.description}</td>*/}
                                                            <td style={{
                                                                verticalAlign: "middle",
                                                                border: "1px solid #ecebeb"
                                                            }}>
                                                                <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Button style={{
                                                                        width: "45px",
                                                                        height: "45px",
                                                                        fontSize: "22px"
                                                                    }}
                                                                            onClick={this.minusQuantity.bind(this, item.quantity, item.id)}>
                                                                        <FontAwesomeIcon icon={faMinus}/>
                                                                    </Button>
                                                                    <div style={{marginBottom: "-17px"}}>
                                                                        <Form style={{width: "45px"}}>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    required autoComplete="off"
                                                                                    type="text"
                                                                                    name={"quantity"}
                                                                                    value={item.quantity}
                                                                                    onChange={this.accountChange}
                                                                                    className={"bg-light text-dark"}
                                                                                    style={{
                                                                                        fontSize: "21px",
                                                                                        textAlign: "center"
                                                                                    }}
                                                                                />
                                                                            </Form.Group>
                                                                        </Form>
                                                                    </div>
                                                                    <Button
                                                                        style={{
                                                                            width: "45px",
                                                                            height: "45px",
                                                                            fontSize: "22px"
                                                                        }}
                                                                        onClick={this.plusQuantity.bind(this, item.quantity, item.id)}>
                                                                        <FontAwesomeIcon icon={faPlus}/>
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                            <td class="align-middle"
                                                                style={{border: "1px solid #ecebeb"}}>{item.price} руб.</td>
                                                            <td class="align-middle"
                                                                style={{border: "1px solid #ecebeb"}}>
                                                                <a onClick={this.deleteGood.bind(this, item.id)}
                                                                   style={{color: "#858585", fontSize: "28px"}}>
                                                                    <FontAwesomeIcon icon={faTimes}/>
                                                                </a>
                                                                {/*<ButtonGroup>*/}
                                                                {/*    <Button size={"lg"} variant={"outline-danger"}*/}
                                                                {/*            onClick={this.deleteGood.bind(this, item.id)}>*/}
                                                                {/*        <FontAwesomeIcon icon={faTrash}/>*/}
                                                                {/*    </Button>*/}
                                                                {/*</ButtonGroup>*/}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <h3>Всего товаров: {this.state.sumQuantity} шт.</h3>
                                            <h3>Итоговая сумма: {this.state.totalPrice} руб.</h3>
                                        </Card.Body>
                                }
                            </div>
                            <Card.Footer>{
                                this.state.items.length === 0 ?
                                    <h1></h1> :
                                    <div>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Button variant={"outline-danger"}
                                                    onClick={this.deleteAllGoods.bind()}
                                                    style={{
                                                        width: "250px",
                                                        height: "75px", textSize: "25px", borderRadius: "12px",
                                                    }}>
                                                {/*<FontAwesomeIcon icon={faTrash}/> Отчистить корзину*/}
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    verticalAlign: "center",
                                                }}><FontAwesomeIcon icon={faTrash}
                                                                    style={{marginRight: "2%", fontSize: "30px",}}/>
                                                    <div><p style={{marginBottom: "0", fontSize: "18px"}}>Удалить все
                                                        товары</p>
                                                    </div>
                                                </div>
                                            </Button>
                                            <Button size={"sm"} variant={"outline-success"}
                                                    onClick={this.createOrder.bind()} style={{
                                                width: "250px",
                                                height: "75px",
                                                fontSize: "25px",
                                                borderRadius: "12px",
                                                marginLeft: "auto",
                                            }}>
                                                <FontAwesomeIcon icon={faSignInAlt}/> Оформить заказ
                                            </Button>
                                        </div>
                                    </div>
                            }
                            </Card.Footer>
                        </Card>

                        {/*<div>*/}
                        {/*    {*/}
                        {/*        this.state.items.length === 0 ?*/}
                        {/*            <Link to={"/products/1"}> </Link>*/}
                        {/*            :*/}
                        {/*            <Card style={{*/}
                        {/*                width: "60%",*/}
                        {/*                marginLeft: "14%",*/}
                        {/*                marginTop: "35px",*/}
                        {/*                marginBottom: "10%",*/}
                        {/*            }}>*/}
                        {/*                <Card.Body>*/}
                        {/*                    <div >*/}
                        {/*                        <ListGroup variant="flush" style={{fontSize: "20px", paddingTop: "0", marginBottom: "10px"}}>*/}
                        {/*                            <ListGroup.Item>Всего*/}
                        {/*                                товаров: {this.state.sumQuantity}</ListGroup.Item>*/}
                        {/*                            <ListGroup.Item>Итоговая стоимость: {this.state.totalPrice} руб.</ListGroup.Item>*/}
                        {/*                        </ListGroup>*/}
                        {/*                        <ButtonGroup>*/}
                        {/*                            <Button size={"sm"} variant={"outline-success"}*/}
                        {/*                                    onClick={this.createOrder.bind()} style={{*/}
                        {/*                                width: "250px",*/}
                        {/*                                height: "75px",*/}
                        {/*                                fontSize: "25px",*/}
                        {/*                                borderRadius: "12px",*/}
                        {/*                            }}>*/}
                        {/*                                <FontAwesomeIcon icon={faSignInAlt}/> Оформить заказ*/}
                        {/*                            </Button>*/}
                        {/*                        </ButtonGroup>*/}
                        {/*                    </div>*/}
                        {/*                </Card.Body>*/}
                        {/*            </Card>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <Modal onExit={this.goHome.bind(this)} show={this.state.myShow}
                               onHide={this.switchState.bind(this, false)}
                               centered
                               size={"sm"}>
                            <Form onSubmit={this.ordSubmit} id={"RegistrationFormId"}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Заказ</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicLogin">
                                            <Form.Label>Ваш заказ принят на обработку. Номер
                                                заказа {this.state.orderId}</Form.Label>
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
                    </div>
                }
            </div>
        );
    }
}