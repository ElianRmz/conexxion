const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tencachi99',
  database: 'prueba',
  port : 3306
});
// hfktghfgggggffgfgfgfgfg

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
const { tipo_medicamento, nombreMed, cantidadUnaCaja, cantidadCajas, caducidadMed, ultimaToma, cantidadDosis,frecuentaToma} = req.body;

const sql = 'INSERT INTO medicamento (tipo_medicamento, cantidadUnaCaja, cantidadCajas, nombreMed, caducidadMed, ultimaToma, cantidadDosis,frecuentaToma ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
db.query(sql, [tipo_medicamento, cantidadUnaCaja, cantidadCajas, nombreMed, caducidadMed, ultimaToma, cantidadDosis,frecuentaToma], (err, result) => {
    if (err) {
    console.error('Error al insertar datos:', err);
    res.status(500).send('Error al guardar los datos en la base de datos');
    return;
        }
        res.send('Datos guardados en la base de datos');
    });
});


// Servir el archivo HTML
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/agregarMed.html');
  res.send("Request delivered");
  console.log("Hola mami");

});
app.get('/getMedicamentos', (req, res) => {
  const sql = 'SELECT nombreMed, caducidadMed, cantidadUnaCaja, cantidadDosis, frecuentaToma, ultimaToma FROM medicamento';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al obtener datos:', err);
          res.status(500).send('Error al obtener los datos de la base de datos');
          return;
      }
      res.json(result);
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
