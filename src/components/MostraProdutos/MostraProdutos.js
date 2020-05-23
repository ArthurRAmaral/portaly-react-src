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

const MostrarProdutos = (produtos) => {
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
                  <Typography className="nome grey-text text-darken-4">{`${produto.name}`}</Typography>
                  <Typography className="preco">{`R$: ${produto.price}`}</Typography>
                </CardContent>
              </Link>
            </Card>
          );
        })
      ) : (
        <div>Nenhum produto encontrado</div>
      )}
    </Grid>
  );
};

export default MostrarProdutos;
