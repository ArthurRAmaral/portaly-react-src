import React from "react";
import Slider from "react-animated-slider";
import "../../css/components/slider.css";
import useStyles from "./style";
//import InitPath from "../../services/InitPath";

const content = [
    {
        title: "Vulputate Mollis Ultricies Fermentum Parturient",
        price:
            "R$ 450,00",
        button: "Saiba mais sobre o produto",
        image: "https://i.imgur.com/ZXBtVw7.jpg",
    },
    {
        title: "Tortor Dapibus Commodo Aenean Quam",
        price:
            "R$ 450,00",
        button: "Saiba mais sobre o produto",
        image: "https://i.imgur.com/DCdBXcq.jpg",
    },
    {
        title: "Phasellus volutpat metus",
        price:
            "R$ 450,00",
        button: "Saiba mais sobre o produto",
        image: "https://i.imgur.com/DvmN8Hx.jpg",
    }
];

function Slide() {
    const classes = useStyles();
    return (
        <div>
            <Slider autoplay={5000} className={classes.slider.wrapper}>
                {content.map((item, index) => (
                    <div
                        className={classes.link}
                    >
                        <div
                            key={index}
                            className={classes.sliderContent}
                        >
                            <div className={classes.div}>
                                <div className={classes.sliderContent.inner}>
                                    <h1 className={classes.h1}>{item.title}</h1>
                                    <p className={classes.p}>{item.price}</p>
                                    <button className={classes.button}>{item.button}</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.imagemDiv}>
                            <img src={item.image} className={classes.imagem} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div >
    )
};

export default Slide;