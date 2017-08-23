class ResourceManager {
    /**
     * ResourceManager
     * @param {Object} library
     */
    constructor (library) {
        this.library = library;
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
     */
    addResource (type, resource) {
        this.library[type].resources.push(resource);
    }

    /**
     * Add HTML to manager
     * @param {string} html
     */
    addHtml (html) {
        this.html = html;
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
