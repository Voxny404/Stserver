# Simple Terminal Server STS
````
    ███████ ████████ ███████
    ██         ██    ██     
    ███████    ██    ███████
         ██    ██         ██
    ███████    ██    ███████
````
With STS, you can run multiple servers on the same terminal.
It is easy to configure and does not require extra dependencies.

## How to init
#### `const STserver = require('./src/STserver.js');`
#### `const server = new STserver();`
#### `server.int(PORT, handleIncomingData, routes);`

### Server init function
The server init function supports a port and a function which returns incoming post requests and an object named routes.
Routes have two properties referred to as 'url' and 'location'.The location corresponds with the location of the file stored on the server.And the url is the place indicated in the browser.

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