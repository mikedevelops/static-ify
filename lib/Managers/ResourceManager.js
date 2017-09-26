const fs = require('fs');

class ResourceManager {
    /**
     * ResourceManager
     * @param {string} outputDir
     * @param {Object} library
     * @param {FileService} fileService
     * @param {RequestService} requestService
     * @param {ErrorService} errorService
     */
    constructor (
        outputDir,
        library,
        fileService,
        requestService,
        errorService
    ) {
        this.outputDir = outputDir;
        this.library = library;
        this.fileService = fileService;
        this.requestService = requestService;
        this.errorService = errorService;
        this.html = null;
        this.replaced = [];
        this.ignored = [];
    }

    /**
     * Get library
     * @returns {Object}
     */
    getLibrary () {
        return this.library;
    }

    /**
     * Check if type exists in library
     * @param {string} type
     * @returns {boolean}
     */
    typeExists (type) {
        return !!this.library[type];
    }

    /**
     * Get successful resources
     * @returns {array}
     */
    getSuccessfulResources () {
        return Object.keys(this.library).reduce((resources, type) => {
            const successful = this.library[type].resources.filter(resource => {
                return resource.getSuccess()
            });

            return resources.concat(successful);
        }, []);
    }

    /**
     * Get unsuccessful resources
     * @returns {array}
     */
    getFailedResources () {
        return Object.keys(this.library).reduce((resources, type) => {
            const failed = this.library[type].resources.filter(resource => {
                return !resource.getSuccess()
            });

            return resources.concat(failed);
        }, []);
    }

    /**
     * Get replaced resources
     * @returns {Array}
     */
    getReplaced () {
        return this.replaced;
    }

    /**
     * Get resource types
     * @returns {Array}
     */
    getResourceTypes () {
        return Object.keys(this.library);
    }

    /**
     * Add resource to manager
     * @param {string} type
     * @param {Resource} resource
     * @returns {Resource}
     */
    addResource (type, resource) {
        if (type !== null) {
            this.library[type].resources.push(resource);
        } else {
            this.replaced.push(resource);
        }

        return resource;
    }

    /**
     * Add HTML to manager
     * @param {string} html
     */
    addHtml (html) {
        this.html = html;
    }

    /**
     * Save resources
     */
    async save (output) {
        // build up resource promises here so we can async all the things
        const resourcePromises = [
            this.fileService.saveFile(output, 'index.html', this.html)
        ];

        // for each resource within each type
        for (let type in this.library) {
            for (let resource of this.library[type].resources) {
                // attempt to request and save asset
                if (resource.getDownload()) {
                    try {
                        const resourceRequest = await this.requestService.get(resource.getResourceRequestUrl(), true);

                        resourcePromises.push(this.fileService.saveFile(
                            this.outputDir.join(output, type),
                            resource.getFilename(),
                            resourceRequest
                        ));

                        resource.setSuccess(true);
                    } catch (error) {
                        this.errorService.throwError({
                            msg: `[ResourceManager] Error retrieving "${resource.getResourceRequestUrl()}" | ${error}`
                        });

                        resource.setSuccess(false);
                    }
                }
            }
        }

        await Promise.all(resourcePromises);
    }

    /**
     * Log ignored resources
     * @param {string} resourceString
     */
    ignore (resourceString) {
        this.ignored.push(resourceString);
    }

    /**
     * Get ignored
     * @returns {Array}
     */
    getIgnored () {
        return this.ignored;
    }

    /**
     * Log resource type information
     */
    info () {
        Object.keys(this.library).forEach(type => {
            const resources = this.library[type].resources.filter(resource => resource.local);

            global.logger.log('info', `[ResourceManager] Parsed ${resources.length} "${type}" local resources`);
        });
    }
}

module.exports = ResourceManager;
