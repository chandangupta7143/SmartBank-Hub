
// Mock localStorage for Node environment
if (typeof global.localStorage === 'undefined') {
    global.localStorage = {
        store: {},
        getItem: function (key) {
            return this.store[key] || null;
        },
        setItem: function (key, value) {
            this.store[key] = value.toString();
        },
        removeItem: function (key) {
            delete this.store[key];
        },
        clear: function () {
            this.store = {};
        }
    };
}
