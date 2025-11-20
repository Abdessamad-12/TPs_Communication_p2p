function start(response) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello start");
  response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello upload");
  response.end();
}

function find(response) {
  console.log("Request handler 'find' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello find");
  response.end();
}

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello show");
  response.end();
}

function login(response) {
  console.log("Request handler 'login' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello login");
  response.end();
}

function logout(response) {
  console.log("Request handler 'logout' was called.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hello logout");
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show = show;
exports.login = login;
exports.logout = logout;
