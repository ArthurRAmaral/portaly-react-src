import React, { Fragment } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useStyles from "./style";

import Map from "../../services/mapBoxAndReact/Map";

function SobreNos() {
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="md">
        <Typography className={classes.title}>Quem Somos?</Typography>
        <Typography className={classes.texto}>
          A Portaly é uma empresa atuante no comércio especializado em Portas e
          relacionados, contamos com uma variedade de produtos e modelos do
          mercado com qualidade, preço baixo e excelência no atendimento
          incluindo mercadorias como portas, fechaduras, dobradiças, alizares,
          puxadores, batentes e diversos outros produtos variados. Pensando em
          trazer comodidade e praticidade para nossos clientes, criamos nossa
          loja virtual, respeitando os princípios básicos da nossa empresa.
        </Typography>
        <Typography className={classes.title}>Sustentabilidade</Typography>
        <Typography className={classes.texto}>
          A Portaly, como uma grande empresa moderna, possui princípios de
          sustentabilidade para proteger o meio ambiente, objetivando a qualidade de
          vida de gerações futuras, utilizando de práticas como a reciclagem do
          lixo sólido, reutilização de sobras de matéria-prima além de respeito
          total as leis ambientais do país. Assumimos um compromisso social para
          que a segurança e satisfação do cliente, além de tornar nossos
          funcionários satisfeitos e orgulhosos de fazer parte da organização.
        </Typography>
        <Typography className={classes.title}>Onde estamos?</Typography>
        <Typography className={classes.texto}>
          Av. Francisco Negrão de Lima, 860 - Céu Azul, Belo Horizonte
        </Typography>
        <Map className={classes.map}></Map>
      </Container>
    </Fragment>
  );
}

export default SobreNos;
