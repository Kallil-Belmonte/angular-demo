import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

export class Utils {

  // FORMAT DATE
  static formatDate(date: string, originalFormat: string = 'YYYY-MM-DD', newFormat: string = 'DD/MM/YYYY') {
    return moment(date, originalFormat).format(newFormat);
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // LIMIT WORDS
  static limitWords(string: string, numberOfWords: number) {
    return string.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAYS
  static groupArrays(array: any[], itemsQuantity: number) {
    let newArray = [[]];

    for (let item of array) {
      let lastIndex: number = newArray.length - 1;

      if (newArray[lastIndex].length < itemsQuantity) {
        newArray[lastIndex].push(item);
      } else {
        newArray.push([]);
        newArray[newArray.length - 1].push(item);
      }
    }

    return newArray;
  }


  // SET INPUT CLASS NAME
  static setInputClassName(form: FormGroup, inputName: string, customClassNames: string[] = []): string[] {
    let classList: string[] = ['form-control', ...customClassNames];

    if (form.get(inputName).touched && form.get(inputName).invalid) {
      classList.push('is-invalid');
    }

    return classList;
  }


  // SHOW FIELD ERRORS
  static showFieldErrors(form: FormGroup, inputName: string): boolean {
    if (form.get(inputName).touched && form.get(inputName).errors) {
      return true;
    }

    return false;
  }


  // SET ERROR CLASS NAME
  static setErrorClassName(condition: any): string[] {
    let classList: string[] = ['invalid-feedback'];

    if (condition) {
      classList.push('d-block');
    }

    return classList;
  }

};
