import express from 'express';
import { getAsteroidesFecha } from '../Controladores/asteroidesControladores.js';
import { postAsteroides } from '../Controladores/asteroidesControladores.js';
import { bodyIsEmpty } from '../Controladores/asteroidesControladores.js';

const asteroidesRouter = express.Router();
asteroidesRouter
  .route('/')
  .get(getAsteroidesFecha)
  .post(bodyIsEmpty, postAsteroides);

export { asteroidesRouter };
