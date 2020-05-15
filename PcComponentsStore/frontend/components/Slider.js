import React from "react";
import {Carousel} from "react-bootstrap";

import slide01 from "../../static/img/dark-bg.png"


export default class Slider extends React.Component {
    render() {

        const test = {
            height: "300px",
            width : "600px",
        };
        const test2 = {
            height: "300px",
            width : "600px",
            margin: "0 auto",
            marginTop: "35px",
        };

        // className={"d-block h-50 w-50"}
        return (
            <Carousel style={test2}>
                <Carousel.Item>
                    <img
                        className={"d-block"}
                        src={slide01}
                        alt="First slide"
                        style={test}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={test}>
                    <img
                        className="d-block"
                        // src="holder.js/800x400?text=Second slide&bg=282c34"
                        src={slide01}

                        // width="200"
                        // height="350"
                        alt="Second slide"
                        style={test}
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={test}>
                    <img
                        className="d-block"
                        // src="holder.js/400x200?text=Third slide&bg=20232a"
                        src={slide01}
                        // width="200"
                        // height="350"
                        alt="Third slide"
                        style={test}
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );

    }
}