import axios from "axios";

var PagSeguro = require("pagseguro-nodejs");

var pag = new PagSeguro({
  email: process.env.REACT_APP_PAGSEGURO_EMAIL,
  token: "25542ED49E184E6E8356853880717C63",

  mode: "sandbox",
  sandbox: true,
  sandbox_email: "c71116547086085144918@sandbox.pagseguro.com.br",
});

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

    // console.log(
    //   await axios({
    //     method: "post",
    //     url: `${pag.uri}?email=${pag.email}&token=${pag.token}`,
    //     headers: {
    //       "Content-Type": "application/xml;charset=UTF-8",
    //       "Access-Control-Allow-Origin": "localhost:3000",
    //     },
    //     data: pag.xml.checkout.toString(),
    //   })
    // );

    // let http = new XMLHttpRequest();
    // http.open(
    //   "post",
    //   `${pag.uri}/checkout?email=${pag.email}&token=${pag.token}`,
    //   true
    // );

    // console.log(pag.xml.checkout.toString());

    // http.setRequestHeader(
    //   "Access-Control-Allow-Origin",
    //   "https://sandbox.pagseguro.uol.com.br"
    // );

    // const res = await http.send(pag.xml.checkout.toString());

    // console.log(res);

    // return;
  },
};
