import React from "react";
import {Navbar, Nav, NavDropdown, Modal, Button, Form, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

import NavigationBar from "./NavigationBar";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username: '', password: '', firstName: '',
        lastName: '', email: '', telephoneNumb: ''
    }


    resetAccount = () => {
        this.setState(() => this.initialState);
    };

    submitAccount = event => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/customers/",
            [{
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                telephoneNumb: this.state.telephoneNumb
            }])
            .then(response => response.data)
        this.props.history.push('/')
        // .then((data) => {
        //     this.setState(() => this.initialState);
        //     this.props.history.push('/')
        // });
    }

    accountChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {username, password, firstName, lastName, email, telephoneNumb} = this.state;
        const MyStyle = {
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "34%",
            marginTop: "25px",
            marginBottom: "60px",
            width: "540px",
            backgroundColor: "#d9d7d7"
        }

        return (
            <div>
                <Card style={MyStyle}>
                    <Card.Header><h2>Регистрация</h2></Card.Header>
                    <Form onReset={this.resetAccount.bind()} onSubmit={this.submitAccount} id={"RegistrationFormId"}>
                        <Card.Body>
                            <Form>
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
                                    />
                                </Form.Group>
                            </Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="email"
                                        name={"email"}
                                        value={email}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="name@example.com"
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
                                    />
                                </Form.Group>
                                {/*<Form.Group as={Col} controlId="formBasicLogin">*/}
                                {/*<Form.Text className="text-muted">*/}
                                {/*    We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                                {/*</Form.Group>*/}
                            </Form.Row>
                            {/*<Form.Group controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check type="checkbox"*/}
                            {/*                label="Check me out"/>*/}
                            {/*</Form.Group>*/}
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Зарегистрироваться
                            </Button>
                            {' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Отчистить поля
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}