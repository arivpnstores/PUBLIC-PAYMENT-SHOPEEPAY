const axios = require('axios');

function getBaseUrl(vars) {
  return (vars && vars.SHOPEEPAY_BASE_URL) || 'http://localhost:2007';
}

  const base = getBaseUrl(vars);
  const res = await axios.get(
    `${base}/createqris/amount=${encodeURIComponent(Number(amount))}`,
    { timeout: 15000 }
  );
  return res.data;
}

async function checkPayment(orderSn, vars) {
  const base = getBaseUrl(vars);
  const res = await axios.get(
    `${base}/cekpembayaran/transaction_sn=${encodeURIComponent(String(orderSn))}`,
    { timeout: 15000 }
  );
}

module.exports = { createQRIS, checkPayment, getBaseUrl };
