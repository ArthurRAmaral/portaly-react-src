import axios from "axios";
import xmlParser from "fast-xml-parser";

var PagSeguro = require("pagseguro-nodejs");

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

//Configuranto URLs de retorno e de notificação (Opcional)
//ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica

// pag.setRedirectURL("http://localhost:3000/");
// pag.setNotificationURL("http://localhost:3000/");

export default {
  async gerarPagamento(dados) {
    const { dadosEntrega, dadosProdutos, dadosComprador } = dados;
    // {
    //   id: 1,
    //   description: "Descrição do primeiro produto",
    //   amount: "4230.00",
    //   quantity: 3,
    //   weight: 2342,
    // }
    //Adicionando itens
    for (const item of dadosProdutos) {
      pag.addItem({
        id: item.id,
        description: item.description,
        amount: item.amount,
        quantity: item.quantity,
        weight: item.weight,
      });
    }

    // {
    //   name: "José Comprador",
    //   email: "comprador@uol.com.br",
    //   phoneAreaCode: "51",
    //   phoneNumber: "12345678",
    // }
    //Configurando as informações do comprador
    pag.sender(dadosComprador);

    // {
    //   type: 1,
    //   street: "Rua Alameda dos Anjos",
    //   number: "367",
    //   complement: "Apto 307",
    //   district: "Parque da Lagoa",
    //   postalCode: "01452002",
    //   city: "São Paulo",
    //   state: "RS",
    //   country: "BRA",
    // }
    //Configurando a entrega do pedido
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
