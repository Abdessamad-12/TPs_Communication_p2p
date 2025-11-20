const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/find'] = requestHandlers.find;
handle['/show'] = requestHandlers.show;
handle['/login'] = requestHandlers.login;
handle['/logout'] = requestHandlers.logout;

// VERSION 6 : on passe la fonction route + la table de handlers
server.start(router.route, handle);
