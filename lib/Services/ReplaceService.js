class ReplaceService {
    /**
     * ReplaceService
     * @param {ParserService} parserService
     * @param {RegExpService} regExpService
     * @param {Url} url
     */
    constructor (
        parserService,
        regExpService,
        url
    ) {
        this.parserService = parserService;
        this.regExpService = regExpService;
        this.url = url;
    }

    /**
     * Replace & parse request body
     * @param {string} request
     * @param {string} contents
     */
    replace (request, contents) {
        contents.replace(
            this.regExpService.getResourceRegExp('gi'),
            this.parserService.parse.bind(
                this.parserService,
                this.url.parse(request)
            )
        );
    }
}

module.exports = ReplaceService;
