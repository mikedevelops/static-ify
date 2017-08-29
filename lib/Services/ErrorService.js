class ErrorService {
    /**
     * @param {ErrorFactory} ErrorFactory
     */
    constructor (ErrorFactory) {
        this.ErrorFactory = ErrorFactory;
        this.errors = [];
    }

    /**
     * Throw application error
     * @param {string} msg
     * @param {boolean} exit
     */
    throwError ({ msg, exit = false }) {
        global.logger.log('error', msg);

        this.errors.push(
            this.ErrorFactory({
                msg: msg
            })
        );

        if (exit) {
            throw new Error(msg);
        }
    }

    /**
     * Get errors
     * @returns {Array}
     */
    getErrors () {
        return this.errors;
    }
}

module.exports = ErrorService;
