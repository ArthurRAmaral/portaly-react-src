import React from "react";
import Slider from "react-animated-slider";
import "../../css/components/slider.css";
import useStyles from "./style";

//Links e Itens
import autoBind from "auto-bind";
import { connect } from "react-redux";
import InitPath from "../../services/InitPath";
import { NavLink } from "react-router-dom";



function Slide(props) {
    const classes = useStyles();
    const items = [];
    const content = (
        <div
            className={classes.link}
        >
            <div
                className={classes.sliderContent}
            >
                <div className={classes.div}>
                    <div className={classes.sliderContent.inner}>
                        <h1 className={classes.h1}>{props.item.Name}</h1>
                        <p className={classes.p}>{props.item.Caption}</p>
                        <NavLink to={`${InitPath}/produto/${props.item.slug}`}>
                            <button className={classes.button}>Saiba Mais</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={classes.imagemDiv}>
                <img className={classes.imagem} src={props.item.Image} />
            </div>
        </div>
    );

    items.push(content);

    return (
        <Slider>{items}</Slider>
    );
}

let items = [];

class NewSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: true,
            animation: "fade",
            timer: 1200,
            items: [],
        };

        autoBind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.categorias.length ==
            Object.values(nextProps.products).length
            ? true
            : false;
    }

    componentDidUpdate(prevProps) {
        if (this.state.flag) {
            this.setState({ flag: false });
            this.componentDidMount();
        }
    }

    componentDidMount() {
        if (
            !this.props.categorias ||
            !this.props.products ||
            this.props.categorias.length != Object.values(this.props.products).length
        )
            return;

        const products = this.props.products;
        let categories = Object.keys(products);

        for (let i = 0; i < 7; i++) {
            const pos = (categories.length * Math.random()) << 0;
            const categoryChosen = products[categories[pos]];
            categories.splice(pos, 1);
            const productChosen =
                categoryChosen[(categoryChosen.length * Math.random()) << 0];
            console.log(productChosen);
            const productFormat = {
                Name: productChosen.name,
                Caption: parseFloat(productChosen.price).toFixed(2),
                slug: productChosen.slug,
                Image: productChosen.images[0].src,
            };

            items = this.state.items;
            items.push(productFormat);
            this.setState({ items: items });
        }
    }

    render() {
        return (
            <div>
                <Slider autoplay={5000}>
                    {this.state.items.map((item, index) => (
                        <Slide
                            item={item}
                            key={index}
                        />
                    ))}
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.produtos,
    categorias: state.categorias,
});

export default connect(mapStateToProps, null)(NewSlide);