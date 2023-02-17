import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'soloLetras', async: false })
export class SoloLetras implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const expresionRegular = new RegExp(/^([A-Z]+\s?){4}?$/, 'i')
    return expresionRegular.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '($value) Solo debe contener letras';
  }
}
