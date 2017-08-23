class ParserService {
    /**
     * @param {ResourceManager} manager
     * @param {ResourceFactory} resourceFactory
     * @param {ParserUtils} parserUtils
     * @param {RegExpService} regExpService
     * @param {Url} url
     * @param {path} path
     */
    constructor (
        manager,
        resourceFactory,
        parserUtils,
        regExpService,
        url,
        path
    ) {
        this.manager = manager;
        this.resourceFactory = resourceFactory;
        this.parserUtils = parserUtils;
        this.regExpService = regExpService;
        this.url = url;
        this.path = path;
    }

    /**
     * parse resource
     * @param {Url} requestUrl
     * @param {Url|null} targetUrl
     * @param {string} resourceString
     */
    parse (requestUrl, targetUrl, resourceString) {
        global.logger.log('debug', `[ParserService] Parsing "${resourceString}"`);

        const extractedResource = this.parserUtils.extractResource(resourceString);
        const filename = this.parserUtils.getFilename(extractedResource);
        const type = this.parserUtils.guessType(filename);
        const url = this.url.parse(extractedResource);
        const local = this.parserUtils.isLocalAsset(url.hostname, requestUrl.hostname);
        const resourceRequestUrl = local ? this.parserUtils.getResourceUrl(url, requestUrl) : null;

        // this is too confusing

        const newResourceUrl = targetUrl !== null && !local
            ? resourceString.replace(
                extractedResource,
                targetUrl.format() + extractedResource
            )
            : resourceString.replace(
                extractedResource,
                this.path.join(type, filename)
            );

        const resource = this.manager.addResource(
            type,
            this.resourceFactory({
                cache: resourceString,
                filename: filename,
                type: type,
                local: local,
                resourceRequestUrl: resourceRequestUrl,
                newResourceUrl: newResourceUrl
            })
        );

        global.logger.log('debug', `[ParserService] Created resource ${JSON.stringify(resource, null, 1)}`);

        return newResourceUrl;
    }
}

module.exports = ParserService;
