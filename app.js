const http = require('http');

/** handle GET request */
function getHandler(req, res, reqUrl) {
    res.writeHead(200);
    res.write('GET parameters: ' + reqUrl.searchParams);
    res.end();
}

/** handle POST request */
function postHandler(req, res, reqUrl) {
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        res.writeHead(200);
        res.write('POST parameters: ' + chunk);
        res.end();
    });
}

/** if there is no related function which handles the request, then show error message */
function noResponse(req, res) {
    res.writeHead(404);
    res.write('Sorry, but we have no response..\n');
    res.end();
}

http.createServer((req, res) => {
    // create an object for all redirection options
    const router = {
        'GET/retrieve-data': getHandler,
        'POST/send-data': postHandler,
        'default': noResponse
    };
    // parse the url by using WHATWG URL API
    let reqUrl = new URL(req.url, 'http://127.0.0.1/');
    // find the related function by searching "method + pathname" and run it
    let redirectedFunc = router[req.method + reqUrl.pathname] || router['default'];
    redirectedFunc(req, res, reqUrl);
}).listen(8080, () => {
    console.log('Server is running at http://127.0.0.1:8080/');
});
