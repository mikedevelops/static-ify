class ParserUtils {
    /**
     * ParserUtils
     * @param {ResourceManager} resourceManager
     * @param {RegExpService} regExpService
     * @param {ErrorService} errorService
     * @param {path} path
     */
    constructor (
        resourceManager,
        regExpService,
        errorService,
        path
    ) {
        this.resourceManager = resourceManager;
        this.regExpService = regExpService;
        this.errorService = errorService;
        this.path = path;
    }

    /**
     * Extract resource
     * @param {string|null} resourceString
     */
    extractResource (resourceString) {
        const resource = this.regExpService.resource(resourceString);

        if (!resource) {
            this.errorService.throwError({
                msg: `[ParserUtils] Could not extract resource "${resourceString}"`,
                exit: false
            });
        }

        return resource;
    }

    /**
     * Get filename
     * @param {string} resource
     * @returns {string}
     */
    getFilename (resource) {
        return resource.split('/').pop();
    }

    /**
     * Determine if resource is a "local" resource and needs downloading
     * @param {string|null} resourceHost
     * @param {string} requestHost
     * @returns {boolean}
     */
    isLocalAsset (resourceHost, requestHost) {
        return !resourceHost || resourceHost === requestHost;
    }

    /**
     * Build resource request URL
     * @param {Url} resourceUrl
     * @param {Url} requestUrl
     */
    getResourceUrl (resourceUrl, requestUrl) {
        if (!resourceUrl.hostname) {
            resourceUrl.hostname = requestUrl.hostname;
        }

        if (!resourceUrl.protocol) {

            resourceUrl.protocol = requestUrl.protocol;
        }

        if (!resourceUrl.port) {
            resourceUrl.port = requestUrl.port;
        }

        // stringify Url
        return resourceUrl.format();
    }

    /**
     * Get new local resource URL
     * @param {Url} resourceUrl
     * @param {string} type
     */
    getNewResourceUrl (resourceUrl, type) {
        resourceUrl.pathname = type + resourceUrl.path;

        return resourceUrl.format();
    }

    /**
     * Guess asset type from extension
     * @param {string} assetUrl
     * @returns {string|null}
     */
    guessType (assetUrl) {
        const library = this.resourceManager.getLibrary();
        const extension = this.regExpService.extension(assetUrl);

        if (!extension) {
            this.errorService.throwError({
                msg: `[ParserUtils] Could not get extension "${assetUrl}"`,
                exit: false
            });
        }

        return Object.keys(library).find(type => {
            if (!library[type]) {
                this.errorService.throwError({
                    msg: `[ParserUtils] Could not guess type "${assetUrl}"`,
                    exit: false
                });

                return false;
            } else {
                return library[type].extensions.find(ext => ext === extension);
            }
        }) || null;
    }

    /**
     * Check if a resource needs to be downloaded
     * @param {string} type
     * @returns {boolean}
     */
    isDownloadableResource (type) {
        return this.resourceManager.typeExists(type);
    }
}

module.exports = ParserUtils;
