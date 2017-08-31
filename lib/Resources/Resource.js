class Resource {
    /**
     * @param {string} cache
     * @param {string} filename
     * @param {string} type
     * @param {boolean} local
     * @param {boolean} download
     * @param {string} resourceRequestUrl
     * @param {string} newResourceUrl
     */
    constructor (
        cache,
        filename,
        type,
        local,
        download,
        resourceRequestUrl,
        newResourceUrl
    ) {
        this.cache = cache;
        this.filename = filename;
        this.type = type;
        this.local = local;
        this.download = download;
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

    /**
     * Get download
     * @returns {boolean}
     */
    getDownload () {
        return this.download;
    }

    /**
     * Get local
     * @returns {boolean}
     */
    getLocal () {
        return this.local;
    }

    /**
     * Get cache
     * @returns {string}
     */
    getCache () {
        return this.cache;
    }
}

module.exports = Resource;
