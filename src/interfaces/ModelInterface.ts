export interface ModelInterface {
    type: ModelInterfaceStatic;

    addAttributes(params: any): any;
    addAttribute(name: string, value: any): any;

    get(name: string): any;
    set(name: string, value: any): any;
    find(id: string): any;
    add(): any;
    edit(id: string): any;
    delete(id: string): any;
    form(): any;
}

export interface ModelInterfaceStatic {
    model_name: string;
    booted: boolean;

    boot(): void;
    all(): any;
}

export function staticImplements<T>() {
    return (constructor: T) => {};
}