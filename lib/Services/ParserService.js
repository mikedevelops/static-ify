class ParserService {
    /**
     * @param {ResourceManager} manager
     * @param {ResourceFactory} resourceFactory
     * @param {ParserUtils} parserUtils
     * @param {RegExpService} regExpService
     * @param {Url} url
     */
    constructor (
        manager,
        resourceFactory,
        parserUtils,
        regExpService,
        url
    ) {
        this.manager = manager;
        this.resourceFactory = resourceFactory;
        this.parserUtils = parserUtils;
        this.regExpService = regExpService;
        this.url = url;
    }

    /**
     * parse resource
     * @param {Url} requestUrl
     * @param {string} resourceString
     */
    parse (requestUrl, resourceString) {
        global.logger.log('debug', `[ParserService] Parsing "${resourceString}"`);

        // Fix RegEx lastIndex
        const resourceUrl = this.parserUtils.extractResource(resourceString);
        const type = this.parserUtils.guessType(resourceUrl);
        const url = this.url.parse(resourceUrl);
        const local = this.parserUtils.isLocalAsset(url.hostname, requestUrl.hostname);
        const resourceRequestUrl = local ? this.parserUtils.getResourceUrl(url, requestUrl) : null;

        this.manager.addResource(
            type,
            this.resourceFactory({
                cache: requestUrl,
                extract: resourceUrl,
                type: type,
                url: url,
                local: local,
                resourceRequestUrl: resourceRequestUrl
            })
        );
    }
}

module.exports = ParserService;
