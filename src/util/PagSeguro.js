var PagSeguro = require('pagseguro-nodejs');

var pagseguro = new PagSeguro({
  email: 'sp.am@skeavee.com',
  token: '25542ED49E184E6E8356853880717C63'
});

pagseguro.currency('BRL');
pagseguro.reference('REFERENCE_CODE');

pagseguro.redirect('https://ws.sandbox.pagseguro.uol.com.br/v2/checkout');
pagseguro.notify('https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html');