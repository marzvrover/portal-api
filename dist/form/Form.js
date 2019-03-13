"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Form {
    constructor(elements) {
        this.elements = [];
        this.invalidElements = [];
        if (elements !== undefined)
            this.elements = elements;
    }
    addElement(element) {
        this.elements.push(element);
    }
    getElement(name) {
        return this.elements.find(elem => elem.name.toLowerCase() == name.toLowerCase());
    }
    removeElement(name) {
        let elem = this.elements.find(elem => elem.name.toLowerCase() == name.toLowerCase());
        if (elem === undefined)
            return undefined;
        // @ts-ignore
        let index = this.elements.indexOf(elem);
        return this.elements.splice(index, 1)[0];
    }
    invalid() {
        return this.invalidElements;
    }
    valid() {
        return this.elements.filter(elem => this.invalid().indexOf(elem) < 0);
    }
    validate(data) {
        this.invalidElements = [];
        this.elements.forEach((elem) => {
            if (data.hasOwnProperty(elem.name.toLowerCase())) {
                let valid = elem.validate(data[elem.name.toLowerCase()]);
                if (!valid)
                    this.invalidElements.push(elem);
            }
            else {
                if (elem.required)
                    this.invalidElements.push(elem);
            }
        });
        return this.invalidElements.length === 0;
    }
}
exports.Form = Form;
//# sourceMappingURL=Form.js.map