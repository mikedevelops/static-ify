class Resource {
    /**
     * @param {string} cache
     * @param {string} extract
     * @param {string} type
     * @param {Url} url
     * @param {boolean} local
     * @param {string} resourceRequestUrl
     */
    constructor (cache, extract, type, url, local, resourceRequestUrl) {
        this.cache = cache;
        this.extract = extract;
        this.type = type;
        this.url = url;
        this.local = local;
        this.resourceRequestUrl = resourceRequestUrl;
    }
}

module.exports = Resource;
