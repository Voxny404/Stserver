const fs = require('fs').promises;

class Router {
    constructor(){
        this.paths = null // [{url:,location:,port},]
    }

    async readHtml(fileName) {
        const lookupDir = __dirname + fileName;
        return await fs.readFile(lookupDir).catch((e) => console.log(e));
    }

    setPaths(paths) {
        this.paths = paths
    }
    
    async makeResponse (responseObject, element) {
        if (element.type === 'css') {
            responseObject.status = 200
            responseObject.writeHead = { "Content-Type": "text/css" }
            responseObject.write = await this.readHtml(element.location)
            responseObject.type = 'json'
        }

        if (element.type === 'html') {
            responseObject.status = 200
            responseObject.writeHead = { "Content-Type": "text/html" }
            responseObject.write = await this.readHtml(element.location)
            responseObject.type = 'html'
        }

        if (element.type === 'json') {
            responseObject.status = 200
            responseObject.writeHead = { "Content-Type": "application/json" }
            responseObject.write = await this.readHtml(element.location)
            responseObject.type = 'json'
        }

        if (element.type === 'bin') {
            responseObject.writeHead = { "Content-Type": "application/octet-stream" }
            responseObject.write = await this.readHtml(element.location)
            responseObject.type = 'bin'
        }

        if (!element.type) {
    
            if (!element.location) {
                responseObject.status = 200
                responseObject.write = 'NO HTML FILE FOUND!'
                responseObject.type = 'json'
            }
        }

        return responseObject;
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
                responseObject = await this.makeResponse(responseObject, element);
            }
        }
    
        res.writeHead(responseObject.status, responseObject.writeHead);
        res.write(responseObject.write);
        res.end(); 

        return { req: req, res: res };
    }
}

//const singelton = new Router()
module.exports = Router;