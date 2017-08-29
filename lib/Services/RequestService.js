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
     * Request URL
     * @param {string} url
     */
    get (url) {
        try {
            return this.request(url);
        } catch (err) {
            this.errorService.throwError({
                msg: `[Staticify] ${err}`,
                exit: true
            });
        }
    }
}

module.exports = RequestService;
