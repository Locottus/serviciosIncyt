const Pool = require('pg').Pool

 const pool = new Pool({
   user: 'postgres',
   host: '172.17.250.12',
   database: 'covidqr',
   password: 'postgres2020!Incyt',
   port: 5432,
 })

/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'covidqr',
  password: 'Guatemala1',
  port: 5432,
})
*/

 const getCarnet = (request, response) => {
   console.log('finding carnet');
  const carnet = request.query.carnet;
  var q = `select count(*) from usuarios where carnet = '${carnet}'  ` ;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }

 const getUbicaciones = (request, response) => {
  console.log('returning ubicaciones');
 var q = `select * from ubicaciones order by nombre ` ;
 console.log(q);
 pool.query(q, (error, results) => {
   if (error) {
     response.status(500).send('{"msg":"' + error + '"}');
   }
   response.status(200).json(results.rows);
 })
}

const getRangoAsistencia = (request, response) => {
 console.log('returning asistencia de carnet por ubicacion');
 const ubicacion = request.query.ubicacion;
 const fecha1 = request.query.fecha1;
 const fecha2 = request.query.fecha2;
 const horaInicial = request.query.horaInicial;
 const horaFinal = request.query.horaFinal;
 var f1 = fecha1 + ' ' + horaInicial;
 var f2 = fecha2 + ' ' + horaFinal;
 var q = `select ubicaciones.*,carnet, cast(fecha as text) 
          from asistencia, ubicaciones
          where ubicaciones.ubicacion = '${ubicacion}'  
          and fecha between '${f1}' and   '${f2}'    
          and asistencia.ubicacion = ubicaciones.ubicacion 
        ` 
 ;
 console.log(q);
 pool.query(q, (error, results) => {
   if (error) {
     response.status(500).send('{"msg":"' + error + '"}');
   }
   response.status(200).json(results.rows);
 })
}




 const postAsistencia = (request, response) => {
   console.log('entering postAsistencia');
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
  console.log('entrando a post reporte covid');
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

const getAsistenciaTotal = (request, response) => {
  console.log('returning asistencia de carnet por ubicacion total');
  const fecha1 = request.query.fecha1;
  const fecha2 = request.query.fecha2;
  const horaInicial = request.query.horaInicial;
  const horaFinal = request.query.horaFinal;
  var f1 = fecha1 + ' ' + horaInicial;
  var f2 = fecha2 + ' ' + horaFinal;
  var q = `select count(*), u.nombre, cast(fecha::DATE as text)
            from asistencia a, ubicaciones u
            where a.ubicacion = u.ubicacion
            and fecha between '${f1}' and   '${f2}'
            group by u.nombre, cast(fecha::DATE as text)
            order by u.nombre, cast(fecha::DATE as text)         `
  ;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }

 const getAsistenciaTotalUbicacion = (request, response) => {
  console.log('returning asistencia de carnet por ubicacion total');
  const ubicacion = request.query.ubicacion;
  const fecha1 = request.query.fecha1;
  const fecha2 = request.query.fecha2;
  const horaInicial = request.query.horaInicial;
  const horaFinal = request.query.horaFinal;
  var f1 = fecha1 + ' ' + horaInicial;
  var f2 = fecha2 + ' ' + horaFinal;
  var q = `select count(*), u.nombre, cast(fecha::DATE as text)
            from asistencia a, ubicaciones u
            where a.ubicacion = u.ubicacion
            and fecha between '${f1}' and   '${f2}'
            and a.ubicacion = '${ubicacion}'
            group by u.nombre, cast(fecha::DATE as text)
            order by u.nombre, cast(fecha::DATE as text)         `
  ;
  console.log(q);
  pool.query(q, (error, results) => {
    if (error) {
      response.status(500).send('{"msg":"' + error + '"}');
    }
    response.status(200).json(results.rows);
  })
 }


module.exports = {
  getCarnet,
  postAsistencia,
  postReporteCovid,
  getUbicaciones,
  getRangoAsistencia,
  getAsistenciaTotal,
  getAsistenciaTotalUbicacion
  }
  
