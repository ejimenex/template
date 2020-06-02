import { IValidationResult } from "./IValidationResult";

export interface IFomConfiguration {
    validations(formData: any): IValidationResult;
}
