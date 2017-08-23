class FileService {
    /**
     * @param {path} path
     * @param {mkdirp} mkdirp
     * @param {rimraf} rimraf
     * @param {ResourceManager} resourceManager
     * @param {ErrorService} errorService
     */
    constructor (
        path,
        mkdirp,
        rimraf,
        resourceManager,
        errorService
    ) {
        this.path = path;
        this.mkdirp = mkdirp;
        this.rimraf = rimraf;
        this.resourceManager = resourceManager;
        this.errorService = errorService;
    }

    /**
     * Create bundle directories
     * @param {string} output
     */
    createBundleDirectory (output) {
        const resources = this.resourceManager.getResourceTypes();

        resources.forEach(resource => {
            const path = this.path.join(output, resource);

            this.mkdirp(path, (err) => {
                if (err) {
                    this.errorService.throwError({
                        msg: `[FileService] Unable to create "${resource}" directory`,
                        exit: true
                    });
                } else {
                    global.logger.log('debug', `[FileService] Created "${path}"`);
                }
            });
        });
    }

    /**
     * Remove bundle directory
     * @param {string} output
     */
    removeBundleDirectory (output) {
        this.rimraf(output, {}, (err) => {
            if (err) {
                this.errorService.throwError({
                    msg: `[FileService] Unable to remove "${output}"`,
                    exit: true
                });
            } else {
                global.logger.log('debug', `[FileService] Removed "${output}"`);
            }
        });
    }
}

module.exports = FileService;
