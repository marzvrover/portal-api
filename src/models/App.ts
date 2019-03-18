import {Model} from "../Model";
import {ModelInterface, ModelInterfaceStatic, staticImplements} from "../interfaces/ModelInterface";
import pluralize = require("pluralize");

@staticImplements<ModelInterfaceStatic>()
export class App extends Model implements ModelInterface {
    type: ModelInterfaceStatic = App;
    static model_name: string = 'app';

    static booted: boolean = false;

    constructor(params?: any) {
        super(params);
        (this.type.booted || this.type.boot())
    }

    static boot() {
        this.booted = true;
    }

    get(name: string) {
        return super.get(name);
    }

    set(name: string, value: any) {
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

    static find(id: string) {
        return super.find(this.model_name, id).then((response) => {
            if (! response.hasOwnProperty(this.model_name)) return undefined;
            else return new this(response[this.model_name]);
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

    static async create(attributes: any) {
        let model = new this(attributes);

        await model.save();

        return model;
    }

    delete() {
        return super.delete(this.type.model_name, this.get('slug')).then(
            (response) => response.success
        );
    }

    form() {
        return super.form(this.type.model_name);
    }
}