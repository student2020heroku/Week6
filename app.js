export default function(express, bodyParser, fs, crypto, http) {
    const app = express();
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Headers',
        'Content-Type': 'text/plain; charset=utf-8'
    };
    const login = "moskalev27";
    app
        .use(bodyParser.urlencoded({extend: true}))
        .all('/login/', (req, res) => {
            res.set(CORS);
            res.send(login);
        })

        .all('/code/', (req, res) => {
            res.set(CORS);
            const path = import.meta.url.substring(7);
            fs.readFile(path, 'utf8', ((err, data) =>
                    res.send(data)
            ));
        })
        .all('/sha1/:input/', (req, res) => {
            res.set(CORS);
            const hash = crypto.createHash('sha1')
            .update(req.params.input)
            .digest('hex')
            res.send(hash);
        })
        .use(bodyParser.json())
        .all('/req/', (req, res) => {
            res.set(CORS);
            if (req.method === "GET" || req.method === "POST") {
                const url = req.method === "GET" ? req.query.addr : req.body.addr;
                if (url) {
                    http.get(url, (response) => {
                        let rawData = '';
                        response.on('data', (chunk) => {
                            rawData += chunk;
                        });
                        response.on('end', () => {
                            res.send(rawData);
                        });
                    });
                } else {
                    res.send(login);
                }
            } else {
                res.send(login);
            }
        })
        .all('/*', (req, res) => {
            res.set(CORS);
            res.send(login);
        });

    return app;
}