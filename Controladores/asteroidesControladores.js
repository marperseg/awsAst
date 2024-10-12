import util from 'util';
import fs from 'fs';
import { crearURLasteroides } from '../Utilidades/crearURLasteroides.js';
import { getAsteroidesFromNasa } from '../Utilidades/getAsteroidesFromNasa.js';
import { armarArray } from '../Utilidades/armarArray.js';

const readFileProm = util.promisify(fs.readFile);
const writeFileProm = util.promisify(fs.writeFile);
const archivo = './Datos/ast.json';

const getAsteroidesFecha = (req, res, next) => {
  //Recuperar fecha y api_key de la URL
  const fecha = req.query.fecha;
  const api_key = req.query.key;

  //Crear URL
  const URL = crearURLasteroides(fecha, api_key);

  getAsteroidesFromNasa(URL)
    .then((dataJSON) => {
      //Filtrar por fecha
      const objects = dataJSON.near_earth_objects[fecha];

      //Armar arreglo de objetos
      const objects_proc = armarArray(objects);
      // console.log(objects_proc);

      res.status(200).json({
        estado: 'éxito',
        requestedAt: req.requestedAt,
        cantidad: objects_proc.length,
        data: objects_proc,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAsteroides = (req, res, next) => {
  writeFileProm('./Datos/data.json', JSON.stringify(req.body, null, ' '))
    .then(() => {
      res.status(201).json({
        estado: 'éxito',
        mensaje: 'Información recibida con éxito',
      });
    })
    .catch((err) => {
      res.status(500).json({
        estado: 'Error interno del servidor',
        mensaje: 'Los datos no pudieron guardarse',
        data: err,
      });
    });
};

const bodyIsEmpty = (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({
      estado: 'Error',
      mensaje: 'El cuerpo de la solicitud está vacío 🔍',
    });
    next('Ocurrió un error en el middleware "bodyIsEmpty" 🔍');
  }
  next();
};

export { getAsteroidesFecha, postAsteroides, bodyIsEmpty };
