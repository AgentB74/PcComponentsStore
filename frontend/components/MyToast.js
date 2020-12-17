import React, {Component} from "react";
import {Toast} from "react-bootstrap";


export default class MyToast extends Component {
    render() {
        const toastCss = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '2',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };

        return (
            <div style={this.props.children.show ? toastCss : null}>
                <Toast
                    className={`boarder text-white ${this.props.children.type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`}
                    show={this.props.children.show}>
                    <Toast.Header
                        className={`text-white ${this.props.children.type === "success" ? "bg-success" : "bg-danger"}`}
                        closeButton={false}>
                        {this.props.children.type === "success" ?
                            <strong className={"mr-auto"}>Успешно!</strong>
                            : <strong className={"mr-auto"}>Ошибка!</strong>
                        }
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>

        )
    }

}