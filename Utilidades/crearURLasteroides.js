const crearURLasteroides = (fecha, apiKey) => {
  const URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fecha}&end_date=${fecha}&api_key=${apiKey}`;
  return URL;
};

export { crearURLasteroides };
