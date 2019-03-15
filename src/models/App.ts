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
    }

    find(id: string) {
        return super.find(this.type.model_name, id);
    }

    add() {
        return super.add(this.type.model_name);
    }

    edit(id: string) {
        return super.edit(this.type.model_name, id);
    }

    delete(id: string) {
        return super.delete(this.type.model_name, id);
    }

    form() {
        return super.form(this.type.model_name);
    }
}