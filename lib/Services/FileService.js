class FileService {
    /**
     * @param {path} path
     * @param {mkdirp} mkdirp
     * @param {rimraf} rimraf
     * @param {fs} fs
     * @param {ErrorService} errorService
     */
    constructor (
        path,
        mkdirp,
        rimraf,
        fs,
        errorService
    ) {
        this.path = path;
        this.mkdirp = mkdirp;
        this.rimraf = rimraf;
        this.fs = fs;
        this.errorService = errorService;
    }

    /**
     * Create bundle directories
     * @param {string} output
     * @param {Array} resources
     */
    async createBundleDirectory (output, resources) {
        resources.forEach(resource => {
            const path = this.path.join(output, resource);

            this.mkdirp(path, (err) => {
                if (err) {
                    this.errorService.throwError({
                        msg: `[FileService] Unable to create "${resource}" directory`,
                        exit: true
                    });
                } else {
                    global.logger.log('verbose', `[FileService] Created "${path}"`);
                }
            });
        });
    }

    /**
     * Remove bundle directory
     * @param {string} output
     */
    async removeBundleDirectory (output) {
        console.log('removing: ', output)

        this.rimraf(output, {}, (err) => {
            if (err) {
                this.errorService.throwError({
                    msg: `[FileService] Unable to remove "${output}"`,
                    exit: true
                });
            } else {
                global.logger.log('verbose', `[FileService] Removed "${output}"`);
            }
        });
    }

    /**
     * Save file
     * @param {string} path
     * @param {string} filename
     * @param {string} file
     */
    saveFile (path, filename, file) {
        try {
            this.fs.writeFileSync(this.path.join(path, filename), file, 'utf-8');
            global.logger.log('verbose', `[FileService] Saved "${filename}"`);
        } catch (error) {
            this.errorService.throwError({
                msg: `[FileService] Unable to save "${filename}" | ${error}`,
                exit: true
            });
        }
    }
}

module.exports = FileService;
