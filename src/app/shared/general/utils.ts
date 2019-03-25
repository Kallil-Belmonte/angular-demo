import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

export class Utils {

  // FORMAT DATE
  static formatDate(date: string, originalFormat: string = 'YYYY-MM-DD', newFormat: string = 'DD/MM/YYYY'): string {
    return moment(date, originalFormat).format(newFormat);
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // CAPITALIZE TEXT
  static capitalizeText(text: string): string {
    return text.toLowerCase().replace(/\b./g, function(value: string) {
      return value.toUpperCase();
    });
  };


  // LIMIT WORDS
  static limitWords(text: string, numberOfWords: number): string {
    return text.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAYS
  static groupArrays(array: any[], itemsQuantity: number): any[] {
    const newArray = [[]];

    for (let item of array) {
      const lastIndex: number = newArray.length - 1;

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
    const classList: string[] = ['form-control', ...customClassNames];

    if (form.get(inputName).touched && form.get(inputName).invalid) classList.push('is-invalid');

    return classList;
  }


  // SHOW FIELD ERRORS
  static showFieldErrors(form: FormGroup, inputName: string): boolean {
    if (form.get(inputName).touched && form.get(inputName).errors) return true;

    return false;
  }


  // SET ERROR CLASS NAME
  static setErrorClassName(condition: boolean): string[] {
    const classList: string[] = ['invalid-feedback'];

    if (condition) classList.push('d-block');

    return classList;
  }


  // REMOVE ITEMS FROM INDEXES
  static removeItemsFromIndexes(array: any[], arrayIndexes: number[]) {
    let newArray = array;

    arrayIndexes.forEach((indexItem) => {
      newArray = newArray.filter(arrayItem => array.indexOf(arrayItem) !== indexItem);
    });

    return newArray;
  }

};
