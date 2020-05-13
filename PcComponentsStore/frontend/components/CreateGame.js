import React from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import MyToast from "./MyToast";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.type = "";
        this.state.message = "";
        this.gameChange = this.gameChange.bind(this);
        this.submitGame = this.submitGame.bind(this);
    }

    initialState = {
        owner: '', gameName: '', size: 3
    };

    componentWillUnmount() {
        console.log("componentWillUnmount()");
        clearTimeout(this.state)
    }

    resetGame = () => {
        this.setState(() => this.initialState);
    };

    submitGame = event => {
        event.preventDefault();
        if (this.state.size < 3) {
            alert("Поле не может быть больше чем 3")
        } else {
            axios.post("/Games", {
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

    gameChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const {owner, gameName, size} = this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{
                        show: this.state.show, message: this.state.message,
                        type: this.state.type
                    }}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h2>Registration</h2></Card.Header>
                    <Form onReset={this.resetGame} onSubmit={this.submitGame} id={"RegistrationFormId"}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicLogin">
                                    <Form.Label>Owner's name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name={"owner"}
                                                  value={owner}
                                                  onChange={this.gameChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter owner's name"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <Form.Label>Game title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name={"gameName"}
                                                  value={gameName}
                                                  onChange={this.gameChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter game title"/>
                                    {/*<Form.Text className="text-muted">*/}
                                    {/*    We'll never share your email with anyone else.*/}
                                    {/*</Form.Text>*/}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <Form.Label>Game size </Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name={"size"}
                                                  value={size}
                                                  onChange={this.gameChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter game size"/>
                                    {/*<Form.Text className="text-muted">*/}
                                    {/*    We'll never share your email with anyone else.*/}
                                    {/*</Form.Text>*/}
                                </Form.Group>
                            </Form.Row>
                            {/*<Form.Group controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check type="checkbox"*/}
                            {/*                label="Check me out"/>*/}
                            {/*</Form.Group>*/}

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>
                            {' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}