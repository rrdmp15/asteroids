import { createServer } from "http";

const http = createServer((req, res) => {
    console.log('Origen de la solicitud "CONSOLA": ', req.headers["useragent"]);
    res.end('Origen de la solicitud "HTML": ' + req.headers["user-agent"]);
});

const config = {
    hostname: '127.223.06',
    port : 5500
};

http.listen(config, ()=>{
    console.log(`Servidor: http://${config.hostname}:${config.port}/`);
})