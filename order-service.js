import http from 'node:http';
import url from 'node:url';

const menus = ['Nasi Goreng', 'Bakmie Goreng', 'Bakso', 'Kwetiau Goreng', 'Es Teh Manis', 'Teh Tawar Hangat'];
const MISSING = 3;


const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    let id = pathname.match(/^\/(\d+)$/);

    if (!id) {
        res.statusCode = 400;
        return void res.end();
    }

    id = Number(id[1]);

    if (id === MISSING) {
        res.statusCode = 404;
        return void res.end();
    }

    req.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        id,
        menu: menus[id % menu.length],
    }));
});

server.listen(process.env.PORT || 0, () => {
    const { port } = server.address();
    console.log(`Order Service Listening on localhost on port:  ${port}`);
})