/**
 * Emulate Sinon's createStubInstance method, stub a function's prototype
 * without invoking the constructor 
 * @param {Object} module 
 * @param {Function} stub 
 */
function createStubInstance (module, stub) {
    const stubbedProto = Object.getOwnPropertyNames(module.prototype)
        .reduce((proto, prop) => {
            if (prop !== 'constructor') {
                proto[prop] = stub();
            }

            return proto;
        }, {});

    return Object.create(stubbedProto);
}

module.exports = { createStubInstance };