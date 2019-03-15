import {Portal} from "./Portal";
import {App} from "./models/App";

const MODELS = [
  App,
];

for (let model of MODELS) {
    describe(Portal.ucfirst(model.model_name), () => {
        test('Model will boot', () => {
            new model(); // should boot
            expect(Portal.App.booted).toBe(true);
        });

        test('Model can access API', () => {
            return model.all().then((response) => {
                expect(response).toBeDefined();
            });
        });

        test('Model can set and get attributes', () => {
            const tmp_model = new model();
            const attribute = 'name';
            const value = "Gmail";

            tmp_model.set(attribute, value);

            expect(tmp_model.get(attribute)).toBe(value);
        });

        test('`all()` returns a promise with list of model instances', () => {
           return model.all().then((response) => {
               expect(response[0]).toBeInstanceOf(model);
           });
        });

        test('`find(slug)` returns a promise with a model instance', () => {
            return model.all().then(async (models) => {
                let slug = models[0].get('slug');
                return model.find(slug).then((tmp_model) => {
                    expect(tmp_model.get('slug')).toBe(slug);
                });
            });
        });

        test('`create(attributes)` returns a promise with a model ' +
            'instance that has been saved to the server', () => {

            if (model.model_name == App.model_name) {
                return model.create({
                    'name': 'test-name',
                    'url': 'https://test.url',
                    'iconPath': 'testing/path'
                }).then((response) => {
                    expect(response.get('slug')).toBeDefined();
                });
            }
        });
    });
}