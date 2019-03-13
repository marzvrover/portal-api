"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Portal_1 = require("./Portal");
const App_1 = require("./models/App");
const pluralize = require("pluralize");
const MODELS = [
    App_1.App,
];
for (let key of MODELS) {
    describe(Portal_1.Portal.ucfirst(key.model_name), () => {
        test('Model will boot', () => {
            new key(); // should boot
            expect(Portal_1.Portal.App.booted).toBe(true);
        });
        test('Model can access API', () => {
            return key.all().then((response) => {
                expect(response.hasOwnProperty(pluralize(key.model_name))).toBe(true);
            });
        });
        test('Model can set and get attributes', () => {
            const model = new key();
            const attribute = 'name';
            const value = "Gmail";
            model.set(attribute, value);
            expect(model.get(attribute)).toBe(value);
        });
    });
}
//# sourceMappingURL=Model.spec.js.map