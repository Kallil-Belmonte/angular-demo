import { FormGroup } from '@angular/forms';

// GROUP ARRAY ITEMS
export const groupArrayItems = (array: any[], itemsQuantity: number): any[] => {
  const newArray = [[]];

  array.forEach(item => {
    const lastIndex = newArray.length - 1;

    if (newArray[lastIndex].length < itemsQuantity) {
      newArray[lastIndex].push(item);
    } else {
      newArray.push([]);
      newArray[newArray.length - 1].push(item);
    }
  });

  return newArray;
};


// SET INPUT CLASS NAME
export const setInputClassName = (form: FormGroup, inputName: string, customClassNames: string[] = []): string[] => {
  const classList: string[] = ['form-control', ...customClassNames];

  if (form.get(inputName).touched && form.get(inputName).invalid) classList.push('is-invalid');

  return classList;
};


// SHOW FIELD ERRORS
export const showFieldErrors = (form: FormGroup, inputName: string): boolean => {
  if (form.get(inputName).touched && form.get(inputName).errors) return true;

  return false;
};


// SET ERROR CLASS NAME
export const setErrorClassName = (condition: boolean): string[] => {
  const classList: string[] = ['invalid-feedback'];

  if (condition) classList.push('d-block');

  return classList;
};


// REMOVE ITEMS FROM INDEXES
export const removeItemsFromIndexes = (array: any[], arrayIndexes: number[]) => {
  let newArray = array;

  arrayIndexes.forEach((indexItem) => {
    newArray = newArray.filter(arrayItem => array.indexOf(arrayItem) !== indexItem);
  });

  return newArray;
};
