import React from "react";
import axios from "axios";
import {Button, Card, Col, Form, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logo from "../../static/img/Logo4.png";
import Logo2 from "../../static/img/Logo2.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.id = this.props.match.params.prod_id
    }

    initialState = {
        product: [],
        id: "",
        name: "",
        userId: 1,
        quantity: 1,
        ToastShow: false, ToastType: "", ToastMessage: ""
    }

    componentWillMount() {
        console.log("componentWillMount()");
        axios.get("http://127.0.0.1:8000/api/product/" + this.state.id)
            .then(response => response.data)
            .then((data) => {
                // console.log(data);
                this.setState({product: data})
            });
    }


    inBasket = (goodId, goodPrice) => {
        if (localStorage.getItem('id') !== '0') {
            this.state.userId = localStorage.getItem('id')
            // Это всё для теста 'content-type': 'multipart/form-data'
            const formData = new FormData()
            formData.append('cart', 1)
            formData.append('product', goodId)
            formData.append('quantity', this.state.quantity)
            formData.append('price', goodPrice)
            // axios.defaults.headers.common['Accept'] = 'multipart/form-data'
            axios.post("http://127.0.0.1:8000/api/cart/add/" + 1, formData, {headers: {'content-type': 'multipart/form-data'}})
                .then(response => {
                    if (response.data != null) {
                        // this.setState({"show": true});
                        this.setState(() => this.initialState);
                        this.props.history.push('/basket');
                        // setTimeout(() => this.setState({"show": false}), 2000);
                    } else {
                        // this.setState({"show": false})
                    }
                })
        } else {
            this.setState({"ToastShow": true});
            this.setState({"ToastType": "danger"});
            this.setState({"ToastMessage": "Пожалуйста авторизируйтесь!"});
            setTimeout(() => this.setState({"ToastShow": false}), 2500);
        }
    };

    minusQuantity = () => {
        let temp = this.state.quantity
        temp = temp - 1
        this.setState({"quantity": temp})
        console.log(this.state.quantity)
    }

    plusQuantity = () => {
        let temp = this.state.quantity
        temp = temp + 1
        this.setState({"quantity": temp})
    }

    render() {
        const MyMargin = {
            // margin: "auto",
            // marginTop: "35px",
            // paddingTop: "40px",
            // paddingBottom: "40px",
            marginLeft: "15%",
            backgroundColor: '#ffffff',
            width: "420px",
            height: "300px"
        };

        return (
            <div>
                <div style={{"display": this.state.ToastShow ? "block" : "none"}}>
                    <MyToast children={{
                        show: this.state.ToastShow, message: this.state.ToastMessage,
                        type: this.state.ToastType
                    }}/>
                </div>
                <Jumbotron
                    style={{
                        display: "flex",
                        marginLeft: "14%",
                        marginTop: "35px",
                        paddingBottom: "40px",
                        marginBottom: "100px",
                        width: "1040px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #ecebeb",
                    }}>
                    {this.state.product.map((product) => (
                        <Col className={"d-flex"} style={{marginLeft: "80px"}} lg={11}>
                            <Jumbotron style={{
                                backgroundColor: "#ffffff",
                                width: "1040px",
                                marginLeft: "-80px",
                                // display: "flex",
                                marginRight: "-60px",
                                border: "1px solid #ecebeb",
                            }} className=" text-white">
                                <img style={{margin: "0 auto", display: "flex"}} src={product.image} alt="brand"/>
                            </Jumbotron>
                            <div style={{display: "flex", flexWrap: "wrap", marginLeft: "10%"}}>
                                <Card style={MyMargin} className=" text-dark">
                                    <Card.Header><h4>{product.name}</h4></Card.Header>
                                    <br/>
                                    <Card.Body><h4>Стоимость: {product.price} руб.</h4>
                                        <br/>
                                        <div style={{display: "flex", margin: "0 auto"}}>
                                            <h4 style={{marginRight: "20px"}}>Кол-во: </h4>
                                            <Button style={{width: "40px", height: "40px"}}
                                                    onClick={this.minusQuantity.bind(this)}>
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </Button>
                                            <Form style={{width: "75px", height: "75px"}}>
                                                <Form.Group as={Col} controlId="formBasicLogin">
                                                    <Form.Control
                                                        required autoComplete="off"
                                                        type="text"
                                                        name={"quantity"}
                                                        value={this.state.quantity}
                                                        onChange={this.accountChange}
                                                        className={"bg-light text-dark"}
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <Button
                                                style={{width: "40px", height: "40px", marginRight: "-50px"}}
                                                onClick={this.plusQuantity.bind(this)}>
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
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary"
                                                onClick={this.inBasket.bind(this, product.id, product.price)}>
                                            В корзину
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Jumbotron>
            </div>
        );
    }
}