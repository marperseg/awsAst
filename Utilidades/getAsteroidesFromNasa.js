import fetch from 'node-fetch';

// const URL =
//   'https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-01&api_key=ZgjNnslP3g9CD7oNStBCtzYJrqNVYsC4jDNQXpR4';

async function getAsteroidesFromNasa(URL) {
  const asteroides = await fetch(URL)
    .then(async (data) => {
      const dataJson = await data.json();
      return dataJson;
    })
    .catch((err) => {
      console.log('Ocurrió un error ', err);
    });
  return asteroides;
}

export { getAsteroidesFromNasa };
