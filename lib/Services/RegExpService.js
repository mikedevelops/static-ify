class RegExpService {
    constructor () {
        this.patterns = {
            resource: /href=["'](.[^"|']*)["']|url\(["'](.[^"|']*)["']\)|url\((.[^"|']*)\)|action=["']([\w]*)["']|src=["'](.[^"|']*)["']/,
            href: /href=[?:"|'](.+)[?:"|']/gi,
            src: /src=(?:"|')(.*?)(?:"|')/g,
            url: /url\((.*?)\)/g,
            action: /action=(?:"|')(.*?)(?:"|')/g,
            extension: /\.([0-9a-z]+$)/
        };
    }

    // todo - have these methods exec the RegExp

    /**
     * extension
     * @param {string} string
     * @param {string} flags
     * @returns {Array|null}
     */
    extension (string, flags = 'i') {
        const re = new RegExp(this.patterns.extension, flags);
        const test = re.exec(string);

        return test !== null ? test[1] : null;
    }

    /**
     * resource
     * @param string
     * @param {string} flags
     * @returns {Array|null}
     */
    resource (string, flags = 'i') {
        const re = new RegExp(this.patterns.resource, flags);
        const test = re.exec(string);

        // filter undefined match groups
        return test !== null ? test.filter(group => group)[1] : null;
    }

    /**
     * Get resource RegExp
     * @param {string} flags
     * @returns {RegExp}
     */
    getResourceRegExp (flags = 'i') {
        return new RegExp(this.patterns.resource, flags);
    }
}

module.exports = RegExpService;
