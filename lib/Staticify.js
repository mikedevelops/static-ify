class Staticify {
    /**
     * @param {Url} url
     * @param {ResourceManager} resourceManager
     * @param {ErrorService} errorService
     * @param {FileService} fileService
     * @param {RequestService} requestService
     * @param {ReplaceService} replaceService
     * @param {Object} options
     */
    constructor (
        url,
        errorService,
        resourceManager,
        fileService,
        requestService,
        replaceService,
        options
    ) {
        this.url = url;
        this.errorService = errorService;
        this.resourceManager = resourceManager;
        this.fileService = fileService;
        this.requestService = requestService;
        this.replaceService = replaceService;
        this.options = options;
    }

    /**
     * Start
     */
    async start () {
        global.logger.log('info', '[Staticify] Starting Staticify');

        // check we have a request
        if (!this.options.request) {
            this.errorService.throwError({
                msg: `[Staticify] No request provided`,
                exit: true
            });
        }

        // create bundle directories
        await this.fileService.createBundleDirectory(
            this.options.output,
            this.resourceManager.getResourceTypes()
        );

        // make initial request
        const request = await this.requestService.get(this.options.request);

        // add HTML to resource manager
        this.resourceManager.addHtml(
            this.replaceService.replace(
                this.options.request,
                this.options.target,
                request
            )
        );

        // log resource information
        this.resourceManager.info();

        // save resources
        await this.resourceManager.save(this.options.output);
    }
}

module.exports = Staticify;
