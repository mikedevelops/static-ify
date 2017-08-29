const fs = require('fs');

class RequestService {
    /**
     * RequestService
     * @param {request} request
     * @param {ErrorService} errorService
     */
    constructor (
        request,
        errorService
    ) {
        this.request = request;
        this.errorService = errorService;
    }

    /**
     * Request URL, optionally return request stream
     * @param {string} url
     * @param {boolean} stream
     */
    get (url, stream = false) {
        return new Promise ((resolve, reject) => {
            this.request.get(url)
                .on('response', response => {
                    // if we are in stream mode and we got a response
                    if (stream && response.statusCode === 200) {
                        response.pause();
                        resolve(response);
                    }
                })
                // resolve non streamed requests
                .then(res => {
                    resolve(res);
                })
                // throw errors
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = RequestService;
