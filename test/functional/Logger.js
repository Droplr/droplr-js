class Logger {
  onResponse(request, response) {
    console.log(`Successfull response:${JSON.stringify({
      response: {
        status: response.status,
        JSON,
        statusText: response.statusText,
        body: JSON.stringify(response.data),
      },
    })}`);
  }

  onError(request, clientError) {
    console.log(`Error response:${JSON.stringify({
      request: JSON.stringify(request),
      clientError: clientError.message,
    })}`);
  }
}

module.exports = Logger;
