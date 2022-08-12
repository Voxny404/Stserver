const server = require('http');
const Router = require('./router.js');

class STserver {
    constructor() {
        this.port = null;
        this.paths = null;
    }

    int(PORT, handleResponse, routes, isHttps) {
        let isHttp = 'http'
        routes.port = PORT
        this.paths = routes
        this.port = PORT
        
        const router = new Router();
        router.setPaths(this.paths)
        if (isHttps) {
            server = require('https')
            isHttp = 'https'
        }

        try {
            new server.createServer(async (req, res) => handleResponse(await router.response(req.url, req, res)))
            .listen(PORT, () => {
                process.stdout.write(`Server running on port ${PORT} \n`)
                require('child_process').exec(`start ${isHttp}://localhost:${PORT}/`);
            })

        } catch (error) {
            console.log(`Server on port ${PORT} ERROR \n${error}`);
        }
    }

}

module.exports = STserver;