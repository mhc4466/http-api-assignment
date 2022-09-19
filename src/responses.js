const respondData = (request, response, statusCode, type, content) => {
  response.writeHead(statusCode, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const successXML = '<response><message>This response is a successful one</message></response>';
const successValue = 'This response is a successful one';

const success = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = successXML;
    return respondData(request, response, 200, 'text/xml', responseXML);
  }

  const messageObj = JSON.stringify({ message: successValue });

  return respondData(request, response, 200, 'application/json', messageObj);
};

// URL badRequest with either JSON or XML and 2 conditions
const badRequest = (request, response, params, acceptedTypes) => {
  let status = 200;
  // XML option, 2 conditions
  if (acceptedTypes[0] === 'text/xml') {
    // Normal if valid not set to true
    let responseXML = successXML;
    if (!params.valid || params.valid !== 'true') {
      responseXML = '<response><message>Valid query parameter not set to true</message>';
      responseXML += '<id>badRequest</id></response>';
      status = 400;
    }
    // Overwritten success
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option, 2 conditions
  const messageObj = { message: successValue };
  // Normal if valid not set to true
  if (!params.valid || params.valid !== 'true') {
    messageObj.message = 'Valid query parameter not set to true';
    messageObj.id = 'badRequest';
    status = 400;
  }

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

// URL unauthorized with either JSON or XML and 2 conditions
const unauthorized = (request, response, params, acceptedTypes) => {
  let status = 200;
  // XML option, 2 conditions
  if (acceptedTypes[0] === 'text/xml') {
    // Normal if loggedIn not set to true
    let responseXML = successXML;
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseXML = '<response><message>loggedIn query parameter not set to yes</message>';
      responseXML += '<id>unauthorized</id></response>';
      status = 401;
    }
    // Overwritten success
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option, 2 conditions
  const messageObj = { message: successValue };
  // Normal if loggedin not set to true
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    messageObj.message = 'loggedIn query parameter not set to yes';
    messageObj.id = 'unauthorized';
    status = 401;
  }

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

// URL forbidden with either JSON or XML. Only one condition
const forbidden = (request, response, params, acceptedTypes) => {
  const status = 403;
  // XML option
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>You lack access to this content</message>';
    responseXML += '<id>forbidden</id></response>';
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option
  const messageObj = { message: successValue };
  messageObj.message = 'You lack access to this content';
  messageObj.id = 'forbidden';

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

// URL internal with either JSON or XML. Only one condition
const internal = (request, response, params, acceptedTypes) => {
  const status = 500;
  // XML option
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>Internal Server Error. Something went bunk</message>';
    responseXML += '<id>internalError</id></response>';
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option
  const messageObj = { message: successValue };
  messageObj.message = 'Internal Server Error. Something went bunk';
  messageObj.id = 'internalError';

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

// URL internal with either JSON or XML. Only one condition
const notImplemented = (request, response, params, acceptedTypes) => {
  const status = 501;
  // XML option
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for fresh content.</message>';
    responseXML += '<id>notImplemented</id></response>';
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option
  const messageObj = { message: successValue };
  messageObj.message = 'A get request for this page has not been implemented yet. Check again later for fresh content.';
  messageObj.id = 'notImplemented';

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

const notFound = (request, response, params, acceptedTypes) => {
  const status = 404;
  // XML option
  if (acceptedTypes && acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>The page you were looking for could not be found.</message>';
    responseXML += '<id>notFound</id></response>';
    return respondData(request, response, status, 'text/xml', responseXML);
  }

  // Default JSON option
  const messageObj = { message: successValue };
  messageObj.message = 'The page you were looking for could not be found.';
  messageObj.id = 'notFound';

  const message = JSON.stringify(messageObj);
  return respondData(request, response, status, 'application/json', message);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
