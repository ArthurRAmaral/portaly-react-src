//From depedencies
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

// From util
import InitPath from "../../services/InitPath";

//From redux
import { addCart } from "../../redux/actions/cartActions";

//From util
import colors from "../../util/Colors";

//From hear
import useStyles from "./style";

function InformaçõesProduto(props) {
  const classes = useStyles();
  const [quantidade, setQuantidade] = React.useState(1);
  const { produto, addCart } = props;
  const [option, setOption] = React.useState(() =>
    produto.attributes.length ? produto.attributes[0].options[0] : 1
  );

  // produto.stock_quantity
  const addQuantidade = () => {
    if (quantidade < 6) setQuantidade(quantidade + 1);
  };

  const removeQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const handleOption = (event) => {
    setOption(event.currentTarget.value);
  };

  const handleAddCart = () => {
    addCart(produto, quantidade, option);
  };

  return (
    <Fragment>
      <Grid>
        <Typography
          className={classes.caminho}
        >{`Home/${produto.categories[0].name}/${produto.name}`}</Typography>
      </Grid>
      <Grid>
        <Typography
          variant="h5"
          className={classes.title}
        >{`${produto.name}`}</Typography>
      </Grid>
      <Grid container justify="flex-end">
        <Typography
          className={classes.caminho}
        >{`Codigo do item: ${produto.id}`}</Typography>
      </Grid>
      <Divider orientation="horizontal" className={classes.divider} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
      >
        {produto.attributes.length ? (
          <FormControl>
            <InputLabel htmlFor="age-native-simple">Variações</InputLabel>
            <Select
              native
              value={option}
              onChange={handleOption}
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
              className={classes.caminho}
            >
              {produto.attributes[0].options.map((option) => (
                <option value={option} key={`option${option}`}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
        <Grid>
          <Box border={1} borderColor={colors.orangeDark}>
            <Typography align="center" className={classes.quantidade}>
              {quantidade}
            </Typography>
          </Box>
          <Grid>
            <AddIcon onClick={addQuantidade} className={classes.icon} />
            <RemoveIcon onClick={removeQuantidade} className={classes.icon} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center" justify="center">
        <Typography
          className={classes.price}
        >{`R$ ${produto.price}`}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCart}
          component={NavLink}
          to={`${InitPath}/meuCarrinho`}
          className={classes.button}
        >
          Adicionar ao carrinho
        </Button>
      </Grid>
      <Divider orientation="horizontal" className={classes.divider} />
      <Grid>
        <Grid>
          <Typography
            className={classes.caminho}
          >{`Categorias: ${produto.categories[0].name}`}</Typography>
          <Typography className={classes.caminho}>{`Descrição: ${
            produto.description
              ? produto.description.split(">")[1].split("<")[0]
              : "Não possui descrição"
          }`}</Typography>
        </Grid>
        <Grid>
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ carrinho: state.carrinho });

const mapDispatchToProps = { addCart };

export default connect(mapStateToProps, mapDispatchToProps)(InformaçõesProduto);
