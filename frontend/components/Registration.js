import React from "react";
import {Navbar, Nav, NavDropdown, Modal, Button, Form, Card, Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

import NavigationBar from "./NavigationBar";
import axios from "axios";
import MyToast from "./MyToast";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username: '', password: '', firstName: '',
        lastName: '', email: '', telephoneNumb: '',
        ToastShow: false, ToastType: "", ToastMessage: "",
        right: false
    }


    resetAccount = () => {
        this.setState(() => this.initialState);
    };

    submitAccount = event => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/auth/register/",
            {
                username: this.state.username,
                password: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                telephone_numb: this.state.telephoneNumb
            }).then(response => {
            console.log(response.data)
            if (response.data != null) {
                this.setState({"ToastShow": true});
                this.setState({"ToastType": "success"});
                this.setState({"ToastMessage": "Аккаунт создан успешно!"});
                this.setState({"right": true});
                // this.setState({"ToastShow": false})
                setTimeout(() => this.props.history.push('/'), 3500);
            }
        });
        if (!this.state.right) {
            console.log("3")
            this.setState({"ToastShow": true});
            this.setState({"ToastType": "danger"});
            this.setState({"ToastMessage": "Ошибка при создании аккаунта!"});
            setTimeout(() => this.setState({"ToastShow": false}), 1500);
        }
        // this.setState(this.initialState);
        // setTimeout(() => this.props.history.push('/TicTacToeGame'), 1000);
    }

    accountChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {username, password, firstName, lastName, email, telephoneNumb} = this.state;
        const myCardStyle = {
            // display: "flex",
            // flexWrap: "wrap",
            marginLeft: "25%",
            marginTop: "15px",
            marginBottom: "60px",
            width: "60%",
            backgroundColor: "#ffffff",
            justifyContent: "spaceBetween"
        }

        const myFormStyle = {
            display: "flex",
            flexDirection: "row",
        }
        return (
            <div>
                <div style={{"display": this.state.ToastShow ? "block" : "none"}}>
                    <MyToast children={{
                        show: this.state.ToastShow, message: this.state.ToastMessage,
                        type: this.state.ToastType
                    }}/>
                </div>
                <Card style={myCardStyle}>
                    <Card.Header><div style={{"marginLeft": "12px"}}><h2>Регистрация</h2></div></Card.Header>
                    <Form onReset={this.resetAccount.bind()} onSubmit={this.submitAccount} id={"RegistrationFormId"}>
                        <Card.Body style={{"fontSize": "18px",}}>
                            <Form style={{myFormStyle}}>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text"
                                        name={"firstName"}
                                        value={firstName}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Введите имя"
                                        style={{"fontSize": "18px", "marginBottom": "10px"}}
                                    />
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text"
                                        name={"lastName"}
                                        value={lastName}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Введите фамилию"
                                        style={{"fontSize": "18px", "marginBottom": "12px"}}
                                    />
                                    <Form.Label>Номер телефона</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text"
                                        name={"telephoneNumb"}
                                        value={telephoneNumb}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="+79009009090"
                                        style={{"fontSize": "18px", "marginBottom": "12px"}}
                                    />
                                </Form.Group>
                            </Form>
                            <Form style={{"fontSize": "20px", "display": "flex", "flexDirection": "row",}}>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="email"
                                        name={"email"}
                                        value={email}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="name@example.com"
                                        style={{"fontSize": "18px", "marginBottom": "12px"}}
                                    />
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="text"
                                        name={"username"}
                                        value={username}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Example1"
                                        style={{"fontSize": "18px", "marginBottom": "12px"}}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    {/*</Form.Group>*/}
                                    {/*<Form.Group as=Col controlId="formBasicPassword">*/}
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="password"
                                        name={"password"}
                                        value={password}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Введите пароль"
                                        style={{"fontSize": "18px", "marginBottom": "12px"}}
                                    />
                                    <Form.Label>Повторите пароль</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="password"
                                        name={"password"}
                                        value={password}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Повторите пароль"
                                        style={{"fontSize": "18px"}}
                                    />
                                </Form.Group>
                            </Form>
                            {/*<Form.Group as={Col} controlId="formBasicLogin">*/}
                            {/*<Form.Text className="text-muted">*/}
                            {/*    We'll never share your email with anyone else.*/}
                            {/*</Form.Text>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check type="checkbox"*/}
                            {/*                label="Check me out"/>*/}
                            {/*</Form.Group>*/}
                        </Card.Body>
                        <Card.Footer
                            // style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-between"}}>
                            style={{"textAlign": "right"}}>
                            <Button variant="success" type="submit" style={{"fontSize": "24px","marginRight":"12px"}}>
                                <FontAwesomeIcon icon={faSave}/> Зарегистрироваться
                            </Button>
                            {/*<Button variant="info" type="reset" style={{"fontSize": "22px",}}>*/}
                            {/*    <FontAwesomeIcon icon={faUndo}/> Отмена*/}
                            {/*</Button>*/}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}