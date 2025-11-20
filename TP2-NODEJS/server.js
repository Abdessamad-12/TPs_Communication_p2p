const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // VERSION 6 : route(handle, pathname, response)
    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888, () => {
    console.log("Server has started on port 8888.");
  });
}

exports.start = start;
