import React from "react";
import {Carousel} from "react-bootstrap";

import slide01 from "../../static/img/dark-bg.png"


export default class Slider extends React.Component {
    render() {

        const test = {
            height: "490px",
            width : "1040px",
        };
        const test2 = {
            height: "490px",
            width : "1040px",
            margin: "0 auto",
            marginTop: "35px",
            // marginLeft: "15%",
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
                        <h3>Первый слайд!</h3>
                        <p>Здесь будет размещена новость о поступлении нового товара</p>
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
                        <h3>Второй слайд!</h3>
                        <p>Здесь будет размещена новость о поступлении нового товара</p>
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
                        <h3>Третий слайд!</h3>
                        <p>Здесь будет размещена новость о поступлении нового товара</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}