import React from "react";
import {Navbar, Nav, NavDropdown, Modal, Button, Form, Card, DropdownButton} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import axios from "axios";


export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        show: false, login: '', password: '', id: 0, user: []
    }

    resetAccount = () => {
        this.setState(() => this.initialState);
    };

    switchState = (state) => {
        this.setState({"show": state});
    }

    signOut = () => {
        localStorage.setItem('id', '0')
        // this.props.history.push('/products/1');
        location.reload()
    }

    submitAccount = event => {
        event.preventDefault();
        axios.get("http://127.0.0.1:8000/api/customers/" + this.state.login)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({"user": data})
                console.log(this.state.user)
                this.state.user.map((MyUser) => (
                    localStorage.setItem('id', MyUser.pk),
                        localStorage.setItem('userName', MyUser.first_name)
                ))
                this.switchState(false)
                location.reload()
            });
    }

    accountChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {show, login, password} = this.state;

        const myFontSize = {
            fontSize: "22px",
        }
        const myFontSize2 = {
            fontSize: "22px",
            // marginLeft: "45%"
            // position: "absolute",
        }
        const myMargin = {
            marginTop: "145px",
            backgroundColor: "#2eabef",
        }

        const fromStyle = {
            fontSize: "20px",
            width: "250px",
            marginBottom: "15px"
        }

        return (
            <>
                <Navbar variant="dark" style={myMargin}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" style={myFontSize}>
                            {/*<Link to={"/products/2"} className="nav-link">Компьютеры</Link>*/}
                            <a className={"nav-link"} href="/products/2"><p style={{
                                margin: "0 auto",
                                marginTop: "8px",
                            }}>Компьютеры</p></a>
                            <a className={"nav-link"} style={myFontSize}>
                                <NavDropdown title="Периферия" size="lg" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/products/12">Клавиатуры</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/13">Компьютерные мыши</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/14">Наушники</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/15">Веб-камеры</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/16">Акустические системы</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/17">Микрофоны</NavDropdown.Item>
                                    {/*<NavDropdown.Divider/>*/}
                                    {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                                </NavDropdown>
                            </a>
                            <a className={"nav-link"} style={myFontSize}>
                                <NavDropdown title="Комплектующие" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/products/12">Процессоры</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/13">Материнские платы</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/14">Видеокарты</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/15">Блоки питания</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/16">Модули памяти</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/17">Звуковые карты</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/17">Кулеры и системы охлаждения</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/17">Жесткие диски</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/17">Корпуса</NavDropdown.Item>
                                    {/*<NavDropdown.Divider/>*/}
                                    {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                                </NavDropdown>
                            </a>
                            <a className={"nav-link"} style={myFontSize}>
                                <NavDropdown title="Кабели" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/products/12">Кабели FireWire</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/13">Кабели USB</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/14">Кабели VGA</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/15">Кабели аудио-видео</NavDropdown.Item>
                                    <NavDropdown.Item href="/products/16">Кабели силовые</NavDropdown.Item>
                                    {/*<NavDropdown.Divider/>*/}
                                    {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                                </NavDropdown>
                            </a>
                            <a href="/products/1" className="nav-link" style={myFontSize2}><p style={{
                                margin: "0 auto",
                                marginTop: "8px",
                            }}>Мониторы</p></a>
                            <a className={"nav-link"} style={myFontSize}>
                                <NavDropdown title="..." id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Информация о сайте</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Контакты</NavDropdown.Item>
                                    <NavDropdown.Item href="/">...</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/">...</NavDropdown.Item>
                                </NavDropdown>
                            </a>
                        </Nav>
                        <Nav style={myFontSize}>
                            {localStorage.getItem('id') !== '0' ?
                                <>
                                    <a className={"nav-link"} style={myFontSize}>Добро
                                        пожаловать, {localStorage.getItem('userName')}</a>
                                    <Link onClick={this.signOut.bind(this)} className="nav-link">
                                        <FontAwesomeIcon style={{fontSize: "22px"}} icon={faSignOutAlt}/>
                                    </Link>
                                </> :
                                <>
                                    <Link onClick={this.switchState.bind(this, true)} className="nav-link">
                                        <FontAwesomeIcon style={{fontSize: "22px"}} icon={faSignInAlt}/>
                                    </Link>
                                </>
                            }
                            {/*<Link to={"/basket"} className="nav-link"><FontAwesomeIcon icon={faShoppingBasket}/></Link>*/}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Modal onExit={this.resetAccount.bind()} show={show}
                       onHide={this.switchState.bind(this, false)}
                       centered
                       size={"sm"}>
                    <Form onReset={this.resetAccount.bind()}
                          onSubmit={this.submitAccount}
                        //   onSubmit={e => this.props.name(e, this.state)}
                          id={"RegistrationFormId"}>
                        <Modal.Header closeButton>
                            <Modal.Title>Авторизация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{"fontSize": "20px"}}>
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
// NavigationBar.propTypes = {
//     handle_signup: PropTypes.func.isRequired
// };

