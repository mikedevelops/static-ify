const fs = require('fs');

class ResourceManager {
    /**
     * ResourceManager
     * @param {path} path
     * @param {Object} library
     * @param {FileService} fileService
     * @param {RequestService} requestService
     */
    constructor (
        path,
        library,
        fileService,
        requestService
    ) {
        this.path = path;
        this.library = library;
        this.fileService = fileService;
        this.requestService = requestService;
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
        // save html
        this.fileService.saveFile(output, 'index.html', this.html);

        // get resources
        Object.keys(this.library).forEach(async type => {
            this.library[type].resources.forEach(async resource => {
                const response = this.requestService.get(resource.getResourceRequestUrl());

                this.fileService.saveFile(this.path.join(output, type), resource.getFilename(), response);
            });
        });
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
