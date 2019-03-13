"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const validator_1 = __importDefault(require("validator"));
class FormElement {
    constructor(name, type, required = false) {
        this.name = name;
        this.type = type;
        this.required = required;
    }
    validate(value) {
        let valid = false;
        if (value !== undefined) {
            switch (this.type.toLowerCase()) {
                case 'text':
                case 'textarea':
                    valid = !validator_1.default.isEmpty(value);
                    break;
                case 'email':
                    valid = validator_1.default.isEmail(value);
                    break;
                case 'url':
                    valid = validator_1.default.isURL(value);
                    break;
                case 'number':
                    valid = validator_1.default.isInt(value);
                    break;
                case 'ip':
                    valid = validator_1.default.isIP(value);
                    break;
                case 'grouptype':
                    valid = !validator_1.default.isEmpty(value);
                    break;
                case 'file':
                default:
                    valid = value !== undefined || value !== null;
                    break;
            }
        }
        if (!this.required && (value == undefined || value == '' || value == null))
            valid = true;
        return valid;
    }
}
exports.FormElement = FormElement;
//# sourceMappingURL=FormElement.js.map