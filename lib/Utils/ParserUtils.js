class ParserUtils {
    /**
     * ParserUtils
     * @param {ResourceManager} resourceManager
     * @param {RegExpService} regExpService
     * @param {ErrorService} errorService
     */
    constructor (
        resourceManager,
        regExpService,
        errorService
    ) {
        this.resourceManager = resourceManager;
        this.regExpService = regExpService;
        this.errorService = errorService;
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
     * Guess asset type from extension
     * @param {string} assetUrl
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
        });
    }
}

module.exports = ParserUtils;
