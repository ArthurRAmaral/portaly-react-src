import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "./Slide.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
} from "@material-ui/core";

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
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

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          Veja agora
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
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

const items = [
  {
    Name: "Porta Diagonal",
    Caption: "Se você procura amor e carinho, abrir a porta é o caminho",
    contentPosition: "left",
    Items: [
      {
        Image: "https://skeavee.com/imagens/portaly/portas/porta-diagonal.jpg",
      },
      {
        Image: "https://skeavee.com/imagens/4.jpg",
      },
    ],
  },
  {
    Name: "Alizar Tauari",
    Caption: "R$ 39,90",
    contentPosition: "left",
    Items: [
      {
        Image: "https://skeavee.com/imagens/2.jpg",
      },
      {
        Image: "https://skeavee.com/imagens/5.jpg",
      },
    ],
  },
  {
    Name: "Fechadura Open Golf",
    Caption: "R$ 39,00",
    contentPosition: "left",
    Items: [
      {
        Image: "https://skeavee.com/imagens/1.jpg",
      },
      {
        Image: "https://skeavee.com/imagens/8.jpg",
      },
    ],
  },
];

class BannerSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 1200,
      animation: "fade",
      indicators: true,
    };

    autoBind(this);
  }

  render() {
    return (
      <div style={{ color: "#494949" }}>
        <Carousel className="Example" indicators={false}>
          {items.map((item, index) => (
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

export default BannerSlide;
