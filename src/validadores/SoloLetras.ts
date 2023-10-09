import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
//Personalizacion de un validador
@ValidatorConstraint({ name: 'soloLetras', async: false })
export class SoloLetras implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const expresionRegular = new RegExp(/^([a-zA-ZÁ-ÿ\u00f1\u00d1]+\s?){4}?$/, 'i') // valida que la entrada sea solo letras
    return expresionRegular.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '($value) Solo debe contener letras';
  }
}
