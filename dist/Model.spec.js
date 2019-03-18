"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Portal_1 = require("./Portal");
const App_1 = require("./models/App");
const MODELS = [
    App_1.App,
];
let modelAllLoaded = {};
let testModel;
async function modelAll(model) {
    if (!modelAllLoaded.hasOwnProperty(model.model_name)) {
        await model.all().then((response) => {
            // @ts-ignore
            modelAllLoaded[model.model_name] = response;
        });
    }
    // @ts-ignore
    return modelAllLoaded[model.model_name];
}
for (let model of MODELS) {
    describe(Portal_1.Portal.ucfirst(model.model_name), () => {
        test('Model will boot', () => {
            new model(); // should boot
            expect(Portal_1.Portal.App.booted).toBe(true);
        });
        test('Model can access API', () => {
            return modelAll(model).then((all) => {
                expect(all).toBeDefined();
            });
        });
        test('`all()` returns a promise with list of model instances', () => {
            return modelAll(model).then((all) => {
                expect(all[0].get('slug')).toBeDefined();
            });
        });
        test('`find(slug)` returns a promise with a model instance', () => {
            return model.all().then(async (models) => {
                let slug = '';
                await modelAll(model).then((all) => {
                    slug = all[0].get('slug');
                });
                return model.find(slug).then((tmp_model) => {
                    // @ts-ignore
                    if (tmp_model == undefined) {
                        console.log(tmp_model);
                        throw Error('tmp_model not defined');
                    }
                    expect(tmp_model.get('slug')).toBe(slug);
                    testModel = tmp_model;
                });
            });
        });
        test('Model can set and get attributes', () => {
            const attribute = 'test_attribute';
            const value = "test_value";
            if (testModel == undefined) {
                throw Error('testModel not defined');
            }
            testModel.set(attribute, value);
            expect(testModel.get(attribute)).toBe(value);
            testModel.set(attribute, undefined);
            testModel = undefined;
        });
        test('`create(attributes)` returns a promise with a model ' +
            'instance that has been saved to the server', () => {
            if (model.model_name == App_1.App.model_name) {
                return model.create({
                    'name': 'test-name',
                    'url': 'https://test.url',
                    'iconPath': 'testing/path'
                }).then((response) => {
                    expect(response.get('slug')).toBeDefined();
                    testModel = response;
                });
            }
        });
        test('`save()` method saves via the API', async () => {
            if (testModel == undefined) {
                throw Error('testModel not defined');
            }
            let name = testModel.get('name') + '-testing';
            testModel.set('name', name);
            await testModel.save();
            expect(testModel.get('name')).toBe(name);
        });
        test('`update()` method updates the model with the current ' +
            'information from the API', async () => {
            if (testModel == undefined) {
                throw Error('testModel not defined');
            }
            let tmp_model;
            await model.find(testModel.get('slug')).then((response) => {
                tmp_model = response;
            });
            // @ts-ignore
            if (tmp_model == undefined) {
                throw Error('tmp_model not defined');
            }
            let name = tmp_model.get('name');
            name = name.substring(0, name.indexOf('-testing'));
            tmp_model.set('name', name);
            await tmp_model.save();
            expect(testModel.get('name')).toBe(name + '-testing');
            await testModel.update();
            expect(testModel.get('name')).toBe(name);
        });
        test('`delete()` method deletes the model via the API', async () => {
            if (testModel == undefined) {
                throw Error('testModel not defined');
            }
            let slug = testModel.get('slug');
            await testModel.delete().then((response) => {
                expect(response).toBeTruthy();
            });
            await model.find(slug).then((response) => {
                expect(response).toBeUndefined();
            });
        });
    });
}
//# sourceMappingURL=Model.spec.js.map