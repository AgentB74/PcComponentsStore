import React from "react";
import {Navbar, Nav, NavDropdown, Modal, Button, Form, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        show: false, login: '', password: ''
    }

    resetAccount = () => {
        this.setState(() => this.initialState);
    };

    switchState = (state) => {
        this.setState({"show": state});
    }

    submitAccount = event => {
        event.preventDefault();
    }

    accountChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {show, login, password} = this.state;

        const myFontSize = {
            fontSize: "20px"
        }
        const myFontSize2 = {
            fontSize: "22px"
            // marginLeft: "45%"
        }
        const myMargin = {
            marginTop: "145px",
        }

        const fromStyle = {
            width: "250px",
        }

        return (
            <>
                <Navbar bg="primary" variant="dark" style={myMargin}>
                    {/*<Link to={""} className="navbar-brand">*/}
                    {/*    /!*<img src="https://image.flaticon.com/icons/svg/566/566294.svg" width="45"*!/*/}
                    {/*    /!*     height="45" alt="brand"/>*!/*/}
                    {/*</Link>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" style={myFontSize}>
                            <Link to={"/products/2"} className="nav-link">Компьютеры</Link>
                            <NavDropdown title="Периферия" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Информация о сайте</NavDropdown.Item>
                                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Link to={""} className="nav-link">Комплектующие</Link>
                            <Link to={""} className="nav-link">Кабели</Link>
                            <Link to={"/products/1"} className="nav-link">Мониторы</Link>
                            {/*<Link to={"/products"} className="nav-link">[TEST] Все товары</Link>*/}
                            <NavDropdown title="..." id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Информация о сайте</NavDropdown.Item>
                                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav style={myFontSize2}>
                            {/*<Link to={"/basket"} className="nav-link"><FontAwesomeIcon icon={faShoppingBasket}/></Link>*/}
                            <Link onClick={this.switchState.bind(this, true)} className="nav-link"><FontAwesomeIcon
                                style={{fontSize: "22px"}}
                                icon={faSignInAlt}/></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Modal onExit={this.resetAccount.bind()} show={show}
                       onHide={this.switchState.bind(this, false)}
                       centered
                       size={"sm"}>
                    <Form onReset={this.resetAccount.bind()} onSubmit={this.submitAccount} id={"RegistrationFormId"}>
                        <Modal.Header closeButton>
                            <Modal.Title>Авторизация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required autoComplete="off"
                                        type="email"
                                        name={"login"}
                                        value={login}
                                        onChange={this.accountChange}
                                        className={"bg-light text-dark"}
                                        placeholder="name@example.com"
                                        style={fromStyle}/>
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
                                        style={fromStyle}/>
                                    {/*<Form.Text className="text-muted">*/}
                                    {/*    We'll never share your email with anyone else.*/}
                                    {/*</Form.Text>*/}
                                </Form.Group>
                            </Form.Row>
                            <Link onClick={this.resetAccount.bind()} to={"/registration"}>Зарегистрироваться</Link>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type={"reset"}>
                                Закрыть
                            </Button>
                            <Button variant="primary" type="submit">
                                Войти
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

