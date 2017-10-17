const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 4400;

app.use('*', cors());

app.use(bodyParser.json());

async function getData() {
  const res = await fetch('http://demo7235469.mockable.io/transactions');
  return { data: await res.json(), found: res.status === 200 };
}

app.get('/transactions', async (req, res) => {
  try {
    const {dataValue} = req.params;
    const dataResult = await getData();

    if (!dataResult.found) {
      res.status(404).end();
      return;
    }

    const {data} = dataResult;
    res.send(data);
  } catch (e) {
    res.status(500).end();
  }
});

app.listen(PORT, function() {
  console.log(`Server running on localhost:${PORT}`)
});