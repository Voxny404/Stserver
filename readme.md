# Simple Terminal Server STS
````
    ███████ ████████ ███████
    ██         ██    ██     
    ███████    ██    ███████
         ██    ██         ██
    ███████    ██    ███████
````
## How to init
#### `const STserver = require('./src/STserver.js');`
#### `const server = new STserver();`
#### `server.int(PORT, handleIncomingData, routes)`

### Server init function
The server init takes in a port and a function that returnes incomming post requests and an object called routes.
routes have 2 properties called 'url' and 'location'. The location is the location of the file stored on the server
and the url is the given location in the browser.

### Routes object example.

````
    const routes = [
        { url:'/',          location:'/html/index.html' },
        { url:'/app.css',   location:'/html/app.css', type: 'css' },
        { url:'/test',      location: null },
    ]
````

## How to start the server
#### `node server.js`

## Note
- No dynamic file system.
- Some data types are not supported yet.
- Errors will be displayed but swallowed. 