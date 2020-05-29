//From depedencies
import React from "react";
import { Link } from "react-router-dom";

//From assets
import imgDefault from "../../assets/imgDefault.png";

//From services
import InitPath from "../../services/InitPath";

//From Material-ui
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import "./MostrarProdutos.css";

const MostrarProdutos = (produtos, showDefault = true) => {
  return (
    <Grid container direction="row" alignContent="center" justify="center">
      {produtos.length > 0 ? (
        produtos.map((produto) => {
          return (
            <Card variant="outlined">
              <Link
                className="produto"
                key={`link-to-${produto.id}`}
                to={`${InitPath}/produto/${produto.slug}`}
              >
                <CardMedia className="card-image">
                  <img
                    key={produto.id}
                    src={
                      produto.images.length > 0
                        ? produto.images[0].src
                        : imgDefault
                    }
                    alt=""
                  />
                </CardMedia>
                <CardContent className="produto-dados">
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <Typography
                      className="nome"
                      align="center"
                    >{`${produto.name}`}</Typography>
                    <Typography
                      className="preco"
                      align="center"
                    >{`R$: ${produto.price}`}</Typography>
                  </Grid>
                </CardContent>
              </Link>
            </Card>
          );
        })
      ) : showDefault ? (
        <div>Nenhum produto encontrado</div>
      ) : null}
    </Grid>
  );
};

export default MostrarProdutos;
