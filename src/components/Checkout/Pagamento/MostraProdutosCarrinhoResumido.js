//From depedencies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//From services
import InitPath from "../../../services/InitPath";

//From Material-ui
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

//From API
import ApiCupom from "../../../services/ApiCupom";

const MostrarProdutos = (props) => {
  const classes = useStyles();
  const {
    freteGratis,
    fretePreco,
    freteLugar,
    buyer,
    couponDesc,
    produtos,
    carrinho,
    removeProductCart,
    handleClick,
    handleChange,
    coupon,
    handleUpdateQuant,
    removeKit,
    updateQuantidadeKit,
  } = props;

  const handleRemoveProduct = (event) => {
    removeProductCart(event.currentTarget.id);
  };

  const handleQuantidade = (event) => {
    handleUpdateQuant(event.currentTarget.id, event.currentTarget.slot);
  };

  const getProdutosCarrinho = (carrinho) => {
    let produtosCarrinho = [];
    for (const produto in carrinho)
      if (
        produto !== "quantidadeTotal" &&
        produto !== "valorTotal" &&
        produto !== "kits"
      )
        produtosCarrinho.push(carrinho[produto]);

    return produtosCarrinho;
  };

  const getkits = (carrinho) => {
    return carrinho.kits ? Object.values(carrinho.kits) : [];
  };

  const produtosCarrinho = getProdutosCarrinho(carrinho);
  const kits = getkits(carrinho);

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const createMessage = async () => {
    setSeverity("info");
    setMsg("Estamos procurando seu cupom, aguarde...");
    setOpen(true);
    if (props.coupon === "") {
      setSeverity("warning");
      setMsg("Nenhum cupom informado");
    } else {
      const response = await ApiCupom.getCoupon(props.coupon);
      if (response.data.length > 0) {
        setSeverity("success");
        setMsg("Cupom válido! Veja seu benefício na tela final de pagamento");
      } else {
        setSeverity("error");
        setMsg("Cupom inválido!");
      }
    }
    setOpen(true);
  };

  return (
    <Grid>
      <Box marginBottom={3}>
        <Typography variant="h4" className={classes.textTotal}>
          Produtos
        </Typography>
      </Box>
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
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {kits.map((kit) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {Object.values(kit.produtos).map((produto) => {
                          return (
                            <Fragment>
                              <Typography
                                key={produto.id}
                                className={classes.textColor}
                              >
                                {produto.name}
                              </Typography>
                            </Fragment>
                          );
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <Typography className={classes.textColor}>
                          {kit.valorDoKit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Grid container alignItems="center" justify="center">
                          <Box
                            border={1}
                            marginRight={2}
                            padding={2}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography className={classes.textColor}>
                              {kit.quantidadeDoKit}
                            </Typography>
                          </Box>
                          <Grid></Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </Fragment>
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  {coupon !== "" ? (
                    <div>
                      <TextField
                        id="coupon"
                        onChange={handleChange}
                        label="Cupom"
                        value={coupon}
                        variant="outlined"
                      />
                      <Typography className={classes.textColor}>
                        {couponDesc}
                      </Typography>
                      <Typography className={classes.textColor}>
                        {couponDesc
                          ? "O valor do cupom de desconto é aplicado ao pagar com o PagSeguro."
                          : ""}
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid>
        <Box marginTop={10} marginBottom={3}>
          <Typography variant="h4" className={classes.textTotal}>
            Valores
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
                  {kits.map((kit, index) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`name${kit.valorDoKit}`}
                      >
                        {`Porta Montada ${index + 1}`}
                      </Typography>
                    );
                  })}
                  <Typography className={classes.textColor}>Total</Typography>
                  <Typography className={classes.textColor}>
                    Entrega {freteLugar ? "para " + freteLugar : ""}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {produtosCarrinho.map((produto) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`sub-total${produto.produto[0].id}`}
                      >
                        {`${produto.quantidade}x ${produto.produto[0].price}`}
                      </Typography>
                    );
                  })}
                  {kits.map((kit) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`sub-total${kit.valorDoKit}`}
                      >
                        {`${kit.quantidadeDoKit}x ${kit.valorDoKit}`}
                      </Typography>
                    );
                  })}
                  <Typography className={classes.textColor}>
                    {carrinho.valorTotal.toFixed(2)}
                  </Typography>
                  <Typography className={classes.textColor}>
                    {fretePreco
                      ? fretePreco
                      : freteGratis
                      ? freteGratis
                      : "Calculando..."}
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
                    {freteGratis
                      ? (carrinho.valorTotal + parseFloat(fretePreco)).toFixed(
                          2
                        )
                      : "Calculando..."}
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
