const server = require('http');
const Router = require('./router.js');

class STserver {
    constructor() {
        this.port = null;
        this.paths = null;
    }
    async getDirFiles (folderDir) {
        return await new Promise(async res => 
            fs.readdir(__dirname + folderDir, 'utf8', (err, files) => {
                err ? console.log(err) : res(files)  
            })
        ) 
    }

    async setRoutesFolder(folderDir) {
        return await new Promise(async res => {
            const files = await this.getDirFiles(folderDir); 
            if (!files) throw (folderDir + ' EMPTY DIRECTORY !');

            for await (const filename of files)  {
                const fileType = filename.split('.')[1] ? filename.split('.')[1] : '';
                const filePath = { url: '/' + filename,   location: folderDir + '/' + filename, type: fileType }
                this.paths.push(filePath);
            }
        
            res(true);
        });
    }

    int(PORT, handleResponse, routes, isHttps) {
        let isHttp = 'http'
        if (routes) routes.port = PORT
        if (routes) this.paths = routes
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