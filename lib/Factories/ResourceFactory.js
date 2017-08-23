const Resource = require('../Resources/Resource');

/**
 * @param {string} cache
 * @param {string} filename
 * @param {string} type
 * @param {boolean} local
 * @param {string} resourceRequestUrl
 * @param {string} newResourceUrl
 * @returns {Resource}
 * @constructor
 */
function ResourceFactory ({
    cache,
    filename,
    type,
    local,
    resourceRequestUrl,
    newResourceUrl
}) {
    return new Resource(
        cache,
        filename,
        type,
        local,
        resourceRequestUrl,
        newResourceUrl
    );
}

module.exports = ResourceFactory;
