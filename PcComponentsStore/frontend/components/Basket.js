import React from "react";
import {Card, Form, Button, Table} from "react-bootstrap";
// import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo, faList} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            id: "",
            username: ""
        };
    }

    componentDidMount() {
        console.log("componentDidMount()");
        axios.get("http://127.0.0.1:8000/api/customers/")
            // .then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({games: data})
                console.log(data);
                this.setState({id: data.pk})
                this.setState({username: data.email})
            });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> User List</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Game Name</th>
                            <th>Date</th>
                            <th>Number of players</th>
                            <th>Number of observers</th>
                            <th>Board size</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.games.length === 0 ?
                                <tr align="center">
                                    < td colSpan={"7"}>There is no games</td>
                                </tr> :
                                this.state.games.map((game) => (
                                    <tr align="center" key={game.id}>
                                        <td>{game.pk}</td>
                                        <td>{this.state.id}</td>
                                        <td>{game.email}</td>
                                        <td>{game.email}</td>
                                        <td>{game.email}</td>
                                        <td>{game.email}</td>
                                        <td>
                                            {/*<ButtonGroup>*/}
                                            {/*<Button size={"sm"} variant={"outline-primary"}*/}
                                            {/*        onClick={this.plusGamer}>*/}
                                            {/*    <FontAwesomeIcon icon={faSignInAlt}/>*/}
                                            {/*</Button>*/}
                                            {/*{' '}*/}
                                            {/*<Button size={"sm"} variant={"outline-danger"}*/}
                                            {/*        onClick={this.deleteGame.bind(this, game.id)}>*/}
                                            {/*    <FontAwesomeIcon icon={faTrash}/>*/}
                                            {/*</Button>*/}
                                            {/*</ButtonGroup>*/}
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