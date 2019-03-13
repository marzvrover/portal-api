import { Model } from "../Model";
import { ModelInterface, ModelInterfaceStatic } from "../interfaces/ModelInterface";
export declare class App extends Model implements ModelInterface {
    type: ModelInterfaceStatic;
    static model_name: string;
    static booted: boolean;
    constructor(params?: any);
    static boot(): void;
    get(name: string): any;
    set(name: string, value: any): void;
    static all(): Promise<any>;
    find(id: string): Promise<any>;
    add(): Promise<any>;
    edit(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    form(): Promise<any>;
}
//# sourceMappingURL=App.d.ts.map