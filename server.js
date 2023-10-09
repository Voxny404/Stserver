
const PORT = 8000;
const STserver = require('./src/STserver.js');
const server = new STserver();
//const server2 = new STserver();

console.log(`
    ███████ ████████ ███████
    ██         ██    ██     
    ███████    ██    ███████
         ██    ██         ██
    ███████    ██    ███████
     Simple Terminal server

`);

// Routes configureation
const routes = [
    { url:'/',          location:'/html/index.html' },
    { url:'/app.css',   location:'/html/app.css', type: 'css' },
    { url:'/test',      location: null },
]

// const routes2 = [
//     { url:'/2',     location:'/html/index.html'},
//     { url:'/test2', location: null },
// ]

// returned value from client
function handleIncomingData(data) {
    if(!data) return 

    let headers = data.req.headers.data 
    let body = data.req.body
    let returnedFromUrl = data.req.url

    if (headers || body) console.log('Request from ' + returnedFromUrl + ' ' + headers + ' \n' + body);

}

server.int(PORT, handleIncomingData, routes)
//server2.int(3000, handleIncomingData, routes2)

// (async () => {
//     // serve a whole directory the directory needs to be in src folder!!!
//     const folderDir = '/html'
//     await server.setRoutesFolder(folderDir);

//     server.int(PORT, handleIncomingData, routes = null);
// })()