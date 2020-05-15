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

// From util
import InitPath from "../../services/InitPath";

//From redux
import { addCart } from "../../redux/actions/cartActions";

function InformaçõesProduto(props) {
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
        <Typography>{`Home/${produto.categories[0].name}/${produto.name}`}</Typography>
      </Grid>
      <Grid>
        <Typography variant="h5">{`${produto.name}`}</Typography>
      </Grid>
      <Grid>
        <Typography>{`Codigo do item: ${produto.id}`}</Typography>
      </Grid>
      <Divider orientation="horizontal" />
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
        <Typography>{`R$ ${produto.price}`}</Typography>
      </Grid>
      <Grid>
        <Typography>{quantidade}</Typography>
        <Grid>
          <AddIcon onClick={addQuantidade} />
          <RemoveIcon onClick={removeQuantidade} />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCart}
          component={NavLink}
          to={`${InitPath}/meuCarrinho`}
        >
          Adicionar ao carrinho
        </Button>
      </Grid>
      <Grid>
        <Grid>
          <Typography>{`Categorias: ${produto.categories[0].name}`}</Typography>
          <Typography>{`Descrição: ${
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
