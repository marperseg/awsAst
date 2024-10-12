import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { asteroidesRouter } from './Rutas/asteroidesRutas.js';
import path from 'path';
import fs from 'fs';
import https from 'https';

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// Load server and CA certificates
// const certCA_path = path.resolve(
//   'C:/Users/Administrator/Documents/serverTest/awsAst/server.crt'
// );
// const keyCA_path = path.resolve(
//   'C:/Users/Administrator/Documents/serverTest/awsAst/myCA.key'
// );
// const pemCA_path = path.resolve(
//   'C:/Users/Administrator/Documents/serverTest/awsAst/myCA.pem'
// );
const certCA_path = path.resolve(
  'D:/TRABAJOS/ColocaPayments/raspay/pixTransferCode/server.crt'
);
const keyCA_path = path.resolve(
  'D:/TRABAJOS/ColocaPayments/raspay/pixTransferCode/myCA.key'
);
const pemCA_path = path.resolve(
  'D:/TRABAJOS/ColocaPayments/raspay/pixTransferCode/myCA.pem'
);
console.log('CERT:', fs.readFileSync(keyCA_path).toString());
const options = {
  key: fs.readFileSync(keyCA_path), // Server private key
  cert: fs.readFileSync(certCA_path), // Server certificate
  ca: fs.readFileSync(pemCA_path), // CA certificate for client verification
  requestCert: true, // Request client certificate
  rejectUnauthorized: true, // Reject clients without valid certificates
};

app.put('/', (req, res) => {
  const exTime = 2 * 60 * 1000; // 2 min
  const options = { maxAge: exTime };
  const valor = {
    usuario: 'Martin',
    pass: 123456,
  };
  const valorJson = JSON.stringify(valor);
  res.cookie('miCookie', valorJson, options);
  res.cookie('otraCookie', 'valor', options);
  res.send('Ok');
});

app.patch('/', (req, res) => {
  console.log('COOKIES:', req.cookies);
  const cookie = JSON.parse(req.cookies.miCookie);
  console.log(cookie.usuario);
  console.log(cookie.pass);
  res.send('OK desde GET');
});

app.use('/v1/asteroides', asteroidesRouter);

// Create HTTPS server with mTLS
https.createServer(options, app).listen(443, () => {
  console.log('API secured with mTLS running on port 443');
});

// app.listen(port, () => {
//   console.log('🏆 Servidor funcionando en el puerto:', port);
// });
