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
  async gerarPagamento(dadosEntega, produtosArray, dadosComprador) {
    // {
    //   id: 1,
    //   description: "Descrição do primeiro produto",
    //   amount: "4230.00",
    //   quantity: 3,
    //   weight: 2342,
    // }
    //Adicionando itens
    for (const item of produtosArray) {
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
    pag.shipping(dadosEntega);

    // pag.transaction(
    //   {
    //     method: "boleto",
    //     // value: Number,
    //     // installments: Number, //opcional, padrão 1
    //     // hash: String, //senderHash gerado pela biblioteca do PagSeguro
    //   },
    //   function (err, data) {
    //     console.log(data);
    //   }
    // );

    // let retorno = null;
    // pag.checkout(function (err, session_id) {
    //   retorno = session_id;
    // });

    const email = pag.email.replace("@", "%40");

    // pag.sessionId(function (err, session_id) {});

    let code = await axios
      .post(
        `/${pag.uri}/checkout?email=${email}&token=${pag.token}`,

        pag.xml.checkout.toString()
      )
      .then((res) => xmlParser.parse(res.data).checkout.code);

    // const email = pag.email.replace("@", "%40");

    // //axios.get(`${pag.uri}/checkout?email=${pag.email}&token=${pag.token}`);

    // const smee = new SmeeClient({
    //   source: "https://smee.io/n3IV1bC9ge9yHC",
    //   target: "http://189.51.107.154:3000/",
    //   logger: console,
    // });

    // const events = smee.start();
    // console.log(events);

    // let http = new XMLHttpRequest();

    // http.open(
    //   "post",
    //   `${pag.uri}/checkout?email=${email}&token=${pag.token}`,
    //   true
    // );

    // http.setRequestHeader("Access-Control-Allow-Origin", "*");
    // http.setRequestHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    // );
    // http.setRequestHeader(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With,content-type"
    // );
    // http.setRequestHeader("Access-Control-Allow-Credentials", true);

    // const res = await http.send(pag.xml.checkout.toString());

    // console.log(res);

    // Stop forwarding events
    // events.close();
    return code;
  },
};
