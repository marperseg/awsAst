import { Asteroide } from './asteroide.js';

function armarArray(objs) {
  let objects_proc = [];

  for (let i = 0; i < objs.length; i++) {
    let sizeKm =
      0.5 *
      (objs[i].estimated_diameter.kilometers.estimated_diameter_max +
        objs[i].estimated_diameter.kilometers.estimated_diameter_min);

    objects_proc[i] = new Asteroide(
      objs[i].id,
      objs[i].name,
      sizeKm,
      objs[i].is_potentially_hazardous_asteroid
    );
  }

  return objects_proc;
}

export { armarArray };
