class Resource {
    /**
     * @param {string} cache
     * @param {string} filename
     * @param {string} type
     * @param {boolean} local
     * @param {string} resourceRequestUrl
     * @param {string} newResourceUrl
     */
    constructor (
        cache,
        filename,
        type,
        local,
        resourceRequestUrl,
        newResourceUrl
    ) {
        this.cache = cache;
        this.filename = filename;
        this.type = type;
        this.local = local;
        this.resourceRequestUrl = resourceRequestUrl;
        this.newResourceUrl = newResourceUrl;
        this.success = null;
    }

    /**
     * Get resource request URL
     * @returns {string|*}
     */
    getResourceRequestUrl () {
        return this.resourceRequestUrl;
    }

    /**
     * Get filename
     * @returns {string|*}
     */
    getFilename () {
        return this.filename;
    }

    /**
     * Get success
     * @returns {null|boolean}
     */
    getSuccess () {
        return this.success;
    }

    /**
     * Set success
     * @param {boolean} success
     */
    setSuccess (success) {
        this.success = success;
    }
}

module.exports = Resource;
