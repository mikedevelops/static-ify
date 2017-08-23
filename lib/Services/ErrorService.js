class ErrorService {
    /**
     * Throw application error
     * @param {string} msg
     * @param {boolean} exit
     */
    throwError ({ msg, exit = true }) {
        global.logger.log('error', msg);

        if (exit) {
            throw new Error(msg);
        }
    }
}

module.exports = ErrorService;
