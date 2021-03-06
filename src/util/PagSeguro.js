import axios from "axios";
import xmlParser from "fast-xml-parser";

var PagSeguro = require("pagseguro-nodejs");

export default {
  async gerarPagamento(dados) {
    var pag = new PagSeguro({
      email: process.env.REACT_APP_PAGSEGURO_EMAIL,
      token: "25542ED49E184E6E8356853880717C63",
      mode: "sandbox",
      sandbox: true,
      sandbox_email: "c71116547086085144918@sandbox.pagseguro.com.br",
    });

    axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com";
    axios.defaults.headers.post["Content-Type"] =
      "application/xml;charset=ISO-8859-1";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    pag.currency("BRL");
    const { dadosEntrega, dadosProdutos, dadosComprador } = dados;
    for (const item of dadosProdutos) {
      pag.addItem({
        id: item.id,
        description: item.description,
        amount: item.amount,
        quantity: item.quantity,
        weight: item.weight,
      });
    }

    pag.sender(dadosComprador);

    pag.shipping(dadosEntrega);

    const email = pag.email.replace("@", "%40");

    let code = await axios
      .post(
        `/${pag.uri}/checkout?email=${email}&token=${pag.token}`,

        pag.xml.checkout.toString()
      )
      .then((res) => xmlParser.parse(res.data).checkout.code);
    return code;
  },
};
