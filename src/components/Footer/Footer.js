// From dependencies
import React from "react";
import { NavLink } from "react-router-dom";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import MapIcon from "@material-ui/icons/Map";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailIcon from "@material-ui/icons/Email";
import useStyles from "./style";

//From util
import ApiCategorias from "../../util/ApiCategorias";
import colors from "../../util/Colors";

//From services
import InitPath from "../../services/InitPath";

const getCatergorias = (setCategorias) => {
  ApiCategorias.getAllCategorias().then((res) => setCategorias([...res.data]));
};

const Footer = () => {
  const classes = useStyles();
  const [categorias, setCategorias] = React.useState([]);

  function setCat(categorias) {
    setCategorias(categorias);
  }

  return (
    <Grid container direction="column" wrap="nowrap" className={classes.root}>
      <Grid container direction="row" justify="space-around">
        <Grid item xs={4} container direction="column" wrap="wrap">
          <List>
            <ListItem key="logo">
              <img
                src="https://portaly.demo.skeavee.com/wp-content/uploads/2020/04/Portaly_Logo_fundo_branco__fee74.png"
                alt="imagem-portaly"
                className={classes.portaly}
              />
            </ListItem>
            <ListItem>
              <Grid>
                <MapIcon />
                <Typography className={classes.text}>
                  Av. Francisco Negrão de Lima, 860 - Céu Azul, Belo Horizonte
                </Typography>
              </Grid>
            </ListItem>
            <ListItem>
              <WhatsAppIcon />
              <Typography className={classes.text}>(31) 2522-2915</Typography>
            </ListItem>
            <ListItem>
              <EmailIcon />
              <Typography className={classes.text}>
                portalyportas@gmail.com
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4} container direction="column">
          <List>
            <Typography variant="h5" className={classes.tille}>
              VEJA MAIS PRODUTOS
            </Typography>
            <Grid container direction="column">
              {!categorias.length
                ? getCatergorias(setCat)
                : categorias.map((cat) => (
                    <ListItem>
                      <NavLink
                        key={`categorias${cat.id}`}
                        to={`${InitPath}/categoria/${cat.id}`}
                      >
                        <Typography className={classes.text}>
                          {cat.name}
                        </Typography>
                      </NavLink>
                    </ListItem>
                  ))}
            </Grid>
          </List>
        </Grid>
        <Grid item xs={4} container direction="column">
          <Typography variant="h5" className={classes.titlePagamento}>
            FORMAS DE PAGAMENTO
          </Typography>
          <ListItem>
            <img
              src="https://skeavee.com/imagens/portaly/assets/PAGSEGURO.png"
              alt="pagseguro"
              className={classes.pagSeguro}
            />
          </ListItem>
          <Typography className={classes.tille}>CARTÕES DE CRÉDITO</Typography>
          <Grid container direction="row">
            <img
              src="https://skeavee.com/imagens/portaly/assets/MASTERCARD.png"
              alt="mastercard"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/VISA.png"
              alt="visa"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/HYPERCARD.png"
              alt="hypercard"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/NAOSEI.png"
              alt="naosei"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/AURA.png"
              alt="aura"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/AMERICANEXPRESS.png"
              alt="america-express"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/ELO.png"
              alt="elo"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/MAESTRO.png"
              alt="maestro"
              className={classes.cartao}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/DISCOVER.png"
              alt="discover"
              className={classes.cartao}
            />
          </Grid>
          <Grid>
            <Typography className={classes.tille}>DÉBITO ONLINE</Typography>
            <img
              src="https://skeavee.com/imagens/portaly/assets/ITAU.png"
              alt="Itau"
              className={classes.debito}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/BANCOBRASIL.png"
              alt="banco-do-brasil"
              className={classes.debito}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/BRADESCO.png"
              alt="bradesco"
              className={classes.debito}
            />
            <img
              src="https://skeavee.com/imagens/portaly/assets/HSBC.png"
              alt="hsbc"
              className={classes.debito}
            />
          </Grid>
          <Grid container>
            <Grid item xs={6} justify="center">
              <Typography className={classes.tille}>BOLETO</Typography>
              <img
                src="https://skeavee.com/imagens/portaly/assets/BOLETO.png"
                alt="boleto"
                className={classes.debito}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.tille}>DEPÓSITO</Typography>
              <img
                src="https://skeavee.com/imagens/portaly/assets/DEPOSITO.png"
                alt="deposito"
                className={classes.debito}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.direitos}
      >
        <Typography className={classes.tesxt}>
          © 2020 PORTALY. TODAS AS FOTOS E DIREITOS SÃO EXCLUSIVOS.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
