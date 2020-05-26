import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "./Slide.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import InitPath from "../../services/InitPath";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

function Banner(props) {
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  const items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">R${props.item.Caption}</Typography>

        <NavLink to={`${InitPath}/produto/${props.item.slug}`}>
          <Button variant="outlined" className="ViewButton">
            Veja agora!
          </Button>
        </NavLink>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];
    const media = (
      <Grid item xs={12 / totalItems} key={`${item.Name}${i}`}>
        {/* <Link href={`/item/${item.Id}`} className="Link"> */}
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
        {/* </Link> */}
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Slider">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

let items = [];

class BannerSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 1200,
      animation: "fade",
      indicators: true,
      items: [],
    };

    autoBind(this);
  }

  componentDidMount() {
    if (!!this.props.produtos) return;
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
        contentPosition: "left",
        slug: productChosen.slug,
        Items: [
          {
            Image: productChosen.images[0].src,
          },
          {
            Image: !!productChosen.images[1]
              ? productChosen.images[1].src
              : productChosen.images[0].src,
          },
        ],
      };
      items = this.state.items;
      items.push(productFormat);
      this.setState({ items: items });
    }
  }

  render() {
    return (
      <div style={{ color: "#494949" }}>
        <Carousel className="Example" indicators={false}>
          {this.state.items.map((item, index) => (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          ))}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.produtos,
  categorias: state.categorias,
});

export default connect(mapStateToProps, null)(BannerSlide);
