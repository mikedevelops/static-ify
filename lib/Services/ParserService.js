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
        global.logger.log('verbose', `[ParserService] Parsing ${resourceString}`);

        // extract resource from attribute e.g. href="css/foo.css" -> css/foo.css
        const extractedResource = this.parserUtils.extractResource(resourceString);

        // parse extracted resource as Url
        const url = this.url.parse(this.url.resolve(requestUrl, extractedResource));

        // determine if this is a local resource
        const local = this.parserUtils.isLocalAsset(url.hostname, requestUrl.hostname);

        // new resource URL, external resources will not be affected
        let newResourceUrl = resourceString;

        if (local) {
            // Get the URL the asset will need to be requested from
            const resourceRequestUrl = this.parserUtils.getResourceUrl(url, requestUrl);

            // get filename from extracted resource e.g. css/foo.css -> foo.css
            const filename = this.parserUtils.getFilename(extractedResource);

            // get type from filename e.g. foo.jpg -> image
            const type = this.parserUtils.guessType(filename);

            // determine if this resource needs downloading
            const download = this.parserUtils.isDownloadableResource(type);

            if (download) {
                // if we have a downloadable asset, set the resource URL to the new resource location in our bundle
                newResourceUrl = resourceString.replace(
                    extractedResource,
                    this.path.join(type, filename)
                );
            } else {
                // if a target URL has been specified, replace the resource URL with the
                // target url e.g original.com/about -> target.com/about
                newResourceUrl = resourceString.replace(
                    extractedResource,
                    this.url.resolve(targetUrl.format(), extractedResource)
                );
            }

            // create Resource object and add to manager
            const resource = this.manager.addResource(
                type,
                this.resourceFactory({
                    cache: resourceString,
                    filename: filename,
                    type: type,
                    local: local,
                    download: download,
                    resourceRequestUrl: resourceRequestUrl,
                    newResourceUrl: newResourceUrl
                })
            );

            // log resource object
            global.logger.log('debug', `[ParserService] Created resource ${JSON.stringify(resource, null, 1)}`);
        } else {
            // keep track of resource strings we completely ignore
            this.manager.ignore(resourceString);
        }

        // return new resource attribute value
        return newResourceUrl;
    }
}

module.exports = ParserService;
