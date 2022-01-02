module.exports = class PhilisterError extends Error {
    static assert(value, message) {
        if (!value) {
            throw new this(message);
        }
    }
}
