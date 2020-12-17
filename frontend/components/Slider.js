import React from "react";
import {Carousel} from "react-bootstrap";

import slide02 from '../../media/products/2020/05/18/Slider/Slede2.jpg'
import slide03 from '../../media/products/2020/05/18/Slider/Slide1.jpg'


export default class Slider extends React.Component {
    render() {

        const test = {
            height: "490px",
            width: "1040px",
        };
        const test2 = {
            height: "490px",
            width: "1040px",
            margin: "0 auto",
            marginTop: "35px",
            // marginLeft: "15%",
        };

        // className={"d-block h-50 w-50"}
        return (
            <Carousel style={test2}>
                <Carousel.Item>
                    <a href={"/product/17"}>
                        <img
                            className={"d-block"}
                            src={slide02}
                            alt="First slide"
                            style={test}
                        />
                        <Carousel.Caption>
                            <h3>Новое поступление!</h3>
                            <p>Успейте купить новую игровую мышь A4Tech Bloody V3. Для настоящих геймеров!</p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item style={test}>
                    <a href={"/product/17"}>
                        <img
                            className="d-block"
                            // src="holder.js/800x400?text=Second slide&bg=282c34"
                            src={slide03}

                            // width="200"
                            // height="350"
                            alt="Second slide"
                            style={test}
                        />
                        <Carousel.Caption>
                            <h3>Новое поступление!</h3>
                            <p>Успейте купить новую игровую мышь A4Tech Bloody V3. Для настоящих геймеров!</p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item style={test}>
                    <a href={"/product/17"}>
                        <img
                            className="d-block"
                            // src="holder.js/400x200?text=Third slide&bg=20232a"
                            src={slide02}
                            // width="200"
                            // height="350"
                            alt="Third slide"
                            style={test}
                        />
                        <Carousel.Caption>
                            <h3>Новое поступление!</h3>
                            <p>Успейте купить новую игровую мышь A4Tech Bloody V3. Для настоящих геймеров!</p>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
            </Carousel>
        );
    }
}