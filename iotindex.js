const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queriesIOT')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/incyt/api/iot', (request, response) => {
  response.json({ info: 'Node.js, Express,nginx and Postgres API IOT' })
})

app.get('/incyt/api/iot/polls_e1ms1', db.polls_e1ms1_RANGO)
app.get('/incyt/api/iot/polls_ise1_infra', db.polls_ise1_infra_RANGO)
app.get('/incyt/api/iot/polls_ise2_infra', db.polls_ise2_infra_RANGO)


app.get('/incyt/api/iot/getISE1_INFR', db.getISE1_INFR)
app.get('/incyt/api/iot/getISE2_INFR', db.getISE2_INFR)
app.get('/incyt/api/iot/getE1MS1', db.getE1MS1)

app.post('/incyt/api/iot/ISE1_INFRA', db.ISE1_INFRA)
app.post('/incyt/api/iot/ISE2_INFRA', db.ISE2_INFRA)
app.post('/incyt/api/iot/E1MS1', db.E1MS1)

app.post('/incyt/api/iot/ISE1_INFRA_TEXT', db.ISE1_INFRA_TEXT)
app.post('/incyt/api/iot/ISE2_INFRA_TEXT', db.ISE2_INFRA_TEXT)
app.post('/incyt/api/iot/E1MS1_TEXT', db.E1MS1_TEXT)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


