const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const respondGet = (request, response, statusCode, type, content) => {
  response.writeHead(statusCode, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respondGet(request, response, 200, 'text/html', index);
};

const getCSS = (request, response) => {
  respondGet(request, response, 200, 'text/css', styles);
};

module.exports = {
  getIndex,
  getCSS,
};
