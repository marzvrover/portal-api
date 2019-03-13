import {Portal} from "./Portal";
import {App} from "./models/App";
import pluralize = require("pluralize");

const MODELS = [
  App,
];

for (let key of MODELS) {
    describe(Portal.ucfirst(key.model_name), () => {
        test('Model will boot', () => {
            new key(); // should boot
            expect(Portal.App.booted).toBe(true);
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