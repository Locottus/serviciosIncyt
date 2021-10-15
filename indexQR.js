const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queriesQR');
const port = 3006;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var ruta = "/incyt/api/qr/";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get(ruta , (request, response) => {
  console.log('invocando qr');
  response.json({ info: 'Node.js, Express, nginx  and Postgres API #QR URL COVID ' });
})

app.get(ruta + 'getCarnet', db.getCarnet);
app.get(ruta + 'getUbicaciones', db.getUbicaciones);
app.get(ruta + 'getRangoAsistencia', db.getRangoAsistencia);
app.get(ruta + 'getAsistenciaTotal', db.getAsistenciaTotal);
app.get(ruta + 'getAsistenciaTotalUbicacion', db.getAsistenciaTotalUbicacion);

app.post(ruta + 'grabaAsistencia', db.postAsistencia);
app.post(ruta + 'reporteCovid', db.postReporteCovid);

app.listen(port, () => {
  console.log(`App qr running on port ${port}.`);
})


