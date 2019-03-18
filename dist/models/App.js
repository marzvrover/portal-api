"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1;
"use strict";
const Model_1 = require("../Model");
const ModelInterface_1 = require("../interfaces/ModelInterface");
const pluralize = require("pluralize");
let App = App_1 = class App extends Model_1.Model {
    constructor(params) {
        super(params);
        this.type = App_1;
        (this.type.booted || this.type.boot());
    }
    static boot() {
        this.booted = true;
    }
    get(name) {
        return super.get(name);
    }
    set(name, value) {
        return super.set(name, value);
    }
    static all() {
        return super.all(this.model_name).then((response) => {
            let models = [];
            for (let modelData of response[pluralize(this.model_name)]) {
                models.push(new this(modelData));
            }
            return models;
        });
    }
    static find(id) {
        return super.find(this.model_name, id).then((response) => {
            if (!response.hasOwnProperty(this.model_name))
                return undefined;
            else
                return new this(response[this.model_name]);
        });
    }
    update() {
        return super.update(this.type.model_name).then(() => {
            return this;
        });
    }
    save() {
        return super.save(this.type.model_name);
    }
    static async create(attributes) {
        let model = new this(attributes);
        await model.save();
        return model;
    }
    delete() {
        return super.delete(this.type.model_name, this.get('slug')).then((response) => response.success);
    }
    form() {
        return super.form(this.type.model_name);
    }
};
App.model_name = 'app';
App.booted = false;
App = App_1 = __decorate([
    ModelInterface_1.staticImplements()
], App);
exports.App = App;
//# sourceMappingURL=App.js.map