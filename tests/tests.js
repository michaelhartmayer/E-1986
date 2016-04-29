describe('ES5 Tests', function () {
    it('Should Work', function () {
        expect(true).toBe(true);
    });
});

describe('ES6 Tests', () => {
    it('Should Work', () => {
        expect(true).toBe(true);
    });
});

var context = require.context('.', true, /\_test\.js/);
context.keys().forEach(context);