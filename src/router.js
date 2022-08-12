const fs = require('fs').promises;

class Router {
    constructor(){
        this.paths = null // [{url:,location:,port},]
    }

    async readHtml(fileName) {
        return await fs.readFile(__dirname + fileName).catch((e) => console.log(e));
    }

    setPaths(paths) {
        this.paths = paths
    }
    
    async response(url, req ,res) {
    
        let responseObject = {
            writeHead: { 'Content-Type': 'application/json' },
            status: 200,
            write: url,
            type: 'json'
        }

        if (!this.paths[url] && url.length > 1) responseObject.write = 'Access denied!'

        for (let index = 0; index < this.paths.length; index++) {
            const element = this.paths[index];

            if (url === element.url) {
                if (element.type === 'css') {
                    responseObject.writeHead = { "Content-Type": "text/css" }
                    responseObject.write = await this.readHtml(element.location)
                }

                if (!element.type) {
                    if (element.location) {
                        responseObject.writeHead = { "Content-Type": "text/html" }
                        responseObject.write = await this.readHtml(element.location)
                        responseObject.type = 'html'
                    }
    
                    if (!element.location) {
                        responseObject.write = 'NO HTML FILE FOUND!'
                        responseObject.type = 'json'
                    }
                }
    
            }
        }
    
        if (responseObject.type === 'json') {
            res.writeHead(responseObject.status, responseObject.writeHead);
            res.write(responseObject.write);
            res.end(); 
        }

        if (responseObject.type === 'html') {
            res.writeHead(responseObject.status, responseObject.writeHead);
            res.end(responseObject.write);
        }

        return { req: req, res: res };
    }
}

//const singelton = new Router()
module.exports = Router;