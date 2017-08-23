const Resource = require('../Resources/Resource');

/**
 * @param {string} cache
 * @param {string} extract
 * @param {string} type
 * @param {Url} url
 * @param {boolean} local
 * @param {string} resourceRequestUrl
 * @returns {Resource}
 * @constructor
 */
function ResourceFactory ({ cache, extract, type, url, local, resourceRequestUrl }) {
    return new Resource(cache, extract, type, url, local, resourceRequestUrl);
}

module.exports = ResourceFactory;
