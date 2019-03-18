"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Portal_1 = require("./Portal");
class Model {
    constructor(params) {
        // @ts-ignore
        this.attributes = {};
        if (params !== undefined && params !== null)
            this.addAttributes(params);
    }
    addAttributes(params) {
        const keys = Object.keys(params);
        for (let key of keys) {
            this.addAttribute(key, params[key]);
        }
    }
    addAttribute(name, value) {
        // @ts-ignore
        this.attributes[name] = value;
    }
    get(name) {
        if (this.attributes.hasOwnProperty(name)) {
            // @ts-ignore
            return this.attributes[name];
        }
        else {
            // @ts-ignore
            return this[name];
        }
    }
    set(name, value) {
        if (value == undefined)
            this.deleteAttribute(name);
        else
            this.addAttribute(name, value);
    }
    deleteAttribute(name) {
        // @ts-ignore
        delete this.attributes[name];
    }
    static all(model_name) {
        return Portal_1.Portal.API.list(model_name);
    }
    static find(model_name, id) {
        return Portal_1.Portal.API.view(model_name, id);
    }
    update(model_name) {
        return Model.find(model_name, this.get('slug')).then((response) => {
            this.addAttributes(response[model_name]);
            return response;
        });
    }
    save(model_name) {
        // return Portal.API.add(model_name, this.attributes);
        let promise;
        if (this.get('slug') === undefined) {
            promise = Portal_1.Portal.API.add(model_name, this.attributes).then((response) => {
                this.addAttributes(response[model_name]);
                return response;
            });
        }
        else {
            promise = Portal_1.Portal.API.edit(model_name, this.get('slug'), this.attributes).then((response) => {
                this.addAttributes(response[model_name]);
                return response;
            });
        }
        return promise;
    }
    delete(model_name, id) {
        return Portal_1.Portal.API.delete(model_name, id);
    }
    form(model_name) {
        return Portal_1.Portal.API.form(model_name);
    }
    /**
     * Compares two models.
     *
     * Returns 0 if models are of the same type and have the same slug.
     * The return value is negative if they are different model types
     * and positive if they are different slugs but of the same type.
     *
     * @param model1
     * @param model2
     *
     * @return number
     */
    static compare(model1, model2) {
        let out;
        if (model1.model_name !== model2.model_name) {
            out = -1;
        }
        else if (model1.get('slug') !== model2.get('slug')) {
            out = 1;
        }
        else
            out = 0;
        return out;
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map