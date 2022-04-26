import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;
    if (!value) {
      return null;
    }

    const length = value.length > 7;
    // const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = length && hasNumeric && hasLowerCase;// && hasUpperCase

    return !passwordValid ? {notStrongEnough: true } : null;

    if (control.value !== '') {
      if (control.value.length < 8) {
        console.log(control.value, control.value.length );
        control.setErrors({notStrongEnough: true});
      }
    }
    return null;
  };
}
