const Error = require('../resources/Error');

/**
 * ErrorFactory
 * @param {string} msg
 * @constructor
 */
function ErrorFactory ({ msg }) {
    return new Error(msg);
}

module.exports = ErrorFactory;
