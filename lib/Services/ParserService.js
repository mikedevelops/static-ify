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
        global.logger.log('verbose', `[ParserService] Parsing "${resourceString}"`);

        // extract resource from attribute e.g. href="css/foo.css" -> css/foo.css
        const extractedResource = this.parserUtils.extractResource(resourceString);

        // get filename from extracted resource e.g. css/foo.css -> foo.css
        const filename = this.parserUtils.getFilename(extractedResource);

        // get type from filename e.g. foo.jpg -> image
        const type = this.parserUtils.guessType(filename);

        // parse extracted resource as Url
        const url = this.url.parse(extractedResource);

        // determine if this is a "local" asset and needs downloading
        const local = this.parserUtils.isLocalAsset(url.hostname, requestUrl.hostname);

        // url we need to download asset from
        const resourceRequestUrl = local ? this.parserUtils.getResourceUrl(url, requestUrl) : null;

        // this is too confusing
        // if we have a "local" asset, this is the new attribute value pointing to our downloaded version
        const newResourceUrl = targetUrl !== null && !local
            ? resourceString.replace(
                extractedResource,
                targetUrl.format() + extractedResource
            )
            : resourceString.replace(
                extractedResource,
                this.path.join(type, filename)
            );

        // create Resource object and add to manager
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

        // log resource object
        global.logger.log('debug', `[ParserService] Created resource ${JSON.stringify(resource, null, 1)}`);

        // return new resource attribute value
        return newResourceUrl;
    }
}

module.exports = ParserService;
