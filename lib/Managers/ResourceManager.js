const fs = require('fs');

class ResourceManager {
    /**
     * ResourceManager
     * @param {path} path
     * @param {Object} library
     * @param {FileService} fileService
     * @param {RequestService} requestService
     * @param {ErrorService} errorService
     */
    constructor (
        path,
        library,
        fileService,
        requestService,
        errorService
    ) {
        this.path = path;
        this.library = library;
        this.fileService = fileService;
        this.requestService = requestService;
        this.errorService = errorService;
        this.html = null;
    }

    /**
     * Get library
     * @returns {Object}
     */
    getLibrary () {
        return this.library;
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
        this.library[type].resources.push(resource);
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
        const resourcePromises = [
            this.fileService.saveFile(output, 'index.html', this.html)
        ];

        // for each resource within each type
        for (let type in this.library) {
            for (let resource of this.library[type].resources) {
                // attempt to request and save asset
                try {
                    resourcePromises.push(this.fileService.saveFile(
                        this.path.join(output, type),
                        resource.getFilename(),
                        await this.requestService.get(resource.getResourceRequestUrl(), true)
                    ));

                    resource.setSuccess(true);
                } catch (error) {
                    this.errorService.throwError({
                        msg: `[ResourceManager] Error retrieving "${resource.getFilename()}" | ${error}`
                    });

                    resource.setSuccess(false);
                }
            }
        }

        await Promise.all(resourcePromises);
    }

    /**
     * Log resource information
     */
    info () {
        Object.keys(this.library).forEach(type => {
            const resources = this.library[type].resources.filter(resource => resource.local);

            global.logger.log('info', `[ResourceManager] Parsed ${resources.length} "${type}" local resources`);
        });
    }
}

module.exports = ResourceManager;
