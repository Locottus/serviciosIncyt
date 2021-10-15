const Pool = require('pg').Pool

 const pool = new Pool({
   user: 'postgres',
   host: '172.17.250.12',
   database: 'covidqr',
   password: 'postgres2020!Incyt',
   port: 5432,
 })



 const getCarnet = (request, response) => {
  const carnet = request.query.carnet;
  var q = `select * from usuario where carnet = '${carnet}'  ` ;
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }


 const postAsistencia = (request, response) => {
	console.log('entrando a PostAsistencia');
	 var {  ubicacion, carnet } = request.body;
let cadena = `insert into asistencia (ubicacion, carnet) values  ('${ubicacion}','${carnet}') `  ;
console.log(cadena);
pool.query(cadena, (error, results) => {
if (error) {
  response.status(500).send('{"msg":"' + error + '"}');
}
//response.status(201).send(`User added with ID: ${results.body}`);
response.status(201).send(`{'msg':'OK'}`);
})
}

const postReporteCovid = (request, response) => {
  var {  carnet, nota, estado } = request.body;
let cadena = ` insert into contagiados (carnet,nota,estado ) values  ('${carnet}','${nota}','${estado}') `  ;
console.log(cadena);
pool.query(cadena, (error, results) => {
if (error) {
  response.status(500).send('{"msg":"' + error + '"}');
}
response.status(201).send(`{'msg':'OK'}`);
})
}


module.exports = {
  getCarnet,
  postAsistencia,
  postReporteCovid

  }
  
