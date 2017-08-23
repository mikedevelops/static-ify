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
    async get (url) {
        try {
            return await this.request(url);
        } catch (err) {
            this.errorService.throwError({
                msg: `[Staticify] ${err}`,
                exit: true
            });
        }
    }
}

module.exports = RequestService;
