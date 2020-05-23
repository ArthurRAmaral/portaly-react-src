//From depedencies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//From assets
import imgDefault from "../../../assets/imgDefault.png";

//From services
import InitPath from "../../../services/InitPath";

//From Material-ui
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

//From checkout
import useStyles from "./style";

//From util
import colors from "../../../util/Colors";
import { Typography } from "@material-ui/core";

const MostrarProdutos = (props) => {
  const classes = useStyles();
  const {
    carrinho,
    removeCart,
    handleClick,
    handleChange,
    coupon,
    handleUpdateQuant,
  } = props;

  const handleRemove = (event) => {
    removeCart(event.currentTarget.id);
  };

  // const handleClick = () => {
  //   this.props.salvaCupom(this.state.coupon);
  // };

  const handleQuantidade = (event) => {
    handleUpdateQuant(event.currentTarget.id, event.currentTarget.slot);
  };

  const getProdutosCarrinho = (carrinho) => {
    let produtosCarrinho = [];
    for (const produto in carrinho)
      if (produto !== "quantidadeTotal" && produto !== "valorTotal")
        produtosCarrinho.push(carrinho[produto]);

    return produtosCarrinho;
  };

  const produtosCarrinho = getProdutosCarrinho(carrinho);

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const createMessage = () => {
    setOpen(true);
    if (props.coupon === "") {
      setSeverity("warning");
      setMsg("Nenhum cupom informado");
    }
    //setSeverity("success");
    //setSeverity("error");
  };

  return (
    <Grid>
      <Box border={2} borderColor={colors.orangeDark}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {msg}
          </Alert>
        </Snackbar>
        <TableContainer className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={classes.textColor}>Produto</TableCell>
                <TableCell align="right" className={classes.textColor}>
                  Preço
                </TableCell>
                <TableCell align="center" className={classes.textColor}>
                  Quantidade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Fragment>
                {produtosCarrinho.map((produto) => {
                  return (
                    <TableRow key={`row${produto.produto[0].id}`}>
                      <TableCell align="left">
                        <CloseIcon
                          onClick={handleRemove}
                          id={produto.produto[0].id}
                        />
                        <Link
                          to={`${InitPath}/produto/${produto.produto[0].slug}`}
                        >
                          <img
                            src={`${produto.produto[0].images[0].src}`}
                            alt=""
                            className={classes.img}
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        key={produto.produto[0].id}
                        className={classes.textColor}
                      >
                        {produto.produto[0].name}
                      </TableCell>
                      <TableCell align="right" className={classes.textColor}>
                        {produto.produto[0].price}
                      </TableCell>
                      <TableCell align="right" className={classes.textColor}>
                        <Grid container alignItems="center" justify="center">
                          <Box
                            border={1}
                            marginRight={2}
                            padding={2}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography>{produto.quantidade}</Typography>
                          </Box>
                          <Grid>
                            <Grid container direction="column">
                              <AddIcon
                                className={classes.icon}
                                id={produto.produto[0].id}
                                slot="aumenta"
                                onClick={handleQuantidade}
                              />
                              <RemoveIcon
                                className={classes.icon}
                                id={produto.produto[0].id}
                                slot="diminui"
                                onClick={handleQuantidade}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </Fragment>
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  {" "}
                  <TextField
                    id="coupon"
                    onChange={handleChange}
                    label="Cupom"
                    value={coupon}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleClick();
                      createMessage();
                    }}
                    className={classes.button}
                    variant="contained"
                  >
                    Aplicar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid>
        <Box marginTop={10} marginBottom={3}>
          <Typography variant="h4" className={classes.textColor}>
            Total do carrinho
          </Typography>
        </Box>
        <Box border={2} borderColor={colors.orangeDark}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography className={classes.textColor}>
                    Subtotal
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {produtosCarrinho.map((produto) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`name${produto.produto[0].id}`}
                      >
                        {`${produto.produto[0].name}`}
                      </Typography>
                    );
                  })}
                  <Typography className={classes.textColor}>Total</Typography>
                </TableCell>
                <TableCell align="right">
                  {produtosCarrinho.map((produto) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`sob-total${produto.produto[0].id}`}
                      >
                        {`${produto.quantidade}x ${(
                          produto.produto[0].price * produto.quantidade
                        ).toFixed(2)}`}
                      </Typography>
                    );
                  })}

                  <Typography className={classes.textColor}>
                    {carrinho.valorTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography className={classes.textTotal}>Total</Typography>
                </TableCell>
                <TableCell />
                <TableCell align="right">
                  <Typography className={classes.textTotal}>
                    {carrinho.valorTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MostrarProdutos;
