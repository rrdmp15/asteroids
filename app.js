import { createServer } from 'http';
import https from 'https';

const apiKey = '1upsZmpsE5Sw5NGFnhjYkCIS9FNumWzvckbArUgr';

const httpServer = createServer((req, res) => {
  if (req.url === '/asteroids' && req.method === 'GET') {
    const ayer = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const hoy = new Date().toISOString().split('T')[0];

    const options = {
      hostname: 'api.nasa.gov',
      path: `/neo/rest/v1/feed?start_date=${ayer}&end_date=${hoy}&api_key=${apiKey}`,
      method: 'GET'
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const asteroides = JSON.parse(data).near_earth_objects[hoy];
        const listaAsteroides = asteroides.map((asteroide) => ({
          nombre: asteroide.name,
          tamaño: asteroide.estimated_diameter.meters.estimated_diameter_max,
          velocidad: asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour,
          fechaAproximacion: asteroide.close_approach_data[0].close_approach_date
        }));

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET'); 
        res.statusCode = 200;
        res.end(JSON.stringify(listaAsteroides));
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Ocurrió un error al obtener los asteroides cercanos a la Tierra' }));
    });

    request.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const config = {
  hostname: '127.223.06',
  port: 5510
};

httpServer.listen(config, () => {
  console.log(`Servidor: http://${config.hostname}:${config.port}/`);
});
