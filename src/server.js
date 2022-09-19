const http = require('http');
const url = require('url');
const query = require('querystring');
// const { parse } = require('path');
const htmlHandler = require('./htmlResponses.js');
const jxHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jxHandler.success,
  '/badRequest': jxHandler.badRequest,
  '/unauthorized': jxHandler.unauthorized,
  '/forbidden': jxHandler.forbidden,
  '/internal': jxHandler.internal,
  '/notImplemented': jxHandler.notImplemented,
  notFound: jxHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response);
  }
  response.end();
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
