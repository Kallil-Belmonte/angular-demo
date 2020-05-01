import { FormGroup } from '@angular/forms';

// GROUP ARRAY ITEMS IN ARRAYS
export const groupArrayItemsInArrays = (array: any[], itemsQuantity: number, repeatLastItem?: boolean): any[] => {
  const matrix = [[]];

  if (repeatLastItem && itemsQuantity > 1) {
    let counter = 0;
    let startSlice = 0;
    let endSlice = itemsQuantity;

    while (counter <= array.length) {
      const lastIndex = matrix.length - 1;

      if (!matrix[lastIndex].length) {
        matrix[lastIndex].push(...array.slice(startSlice, endSlice));

        const ultimoItem = matrix[matrix.length - 1];
        const ultimoItemLastIndex = ultimoItem.length - 1;

        startSlice = array.findIndex(item => item === ultimoItem[ultimoItemLastIndex]);
        endSlice = startSlice + itemsQuantity;

        if (ultimoItem.length < itemsQuantity) {
          break;
        }

        matrix.push([]);
      }

      counter += 1;
    }
  } else {
    array.forEach(item => {
      const lastIndex = matrix.length - 1;

      if (matrix[lastIndex].length < itemsQuantity) {
        matrix[lastIndex].push(item);
      } else {
        matrix.push([]);
        matrix[matrix.length - 1].push(item);
      }
    });
  }

  return matrix;
};


// REMOVE ITEMS FROM ARRAY
export const removeItemsFromArray = (useIndex: boolean, array: any[], itemsToRemove: any) => {
  let newArray: any[] = array;

  itemsToRemove.forEach((itemToRemove: any) => {
    newArray = newArray.filter((arrayItem: any) => {
      if (useIndex) {
        return array.indexOf(arrayItem) !== itemToRemove;
      }

      return arrayItem !== itemToRemove;
    });
  });

  return newArray;
};


// SET FIELD CLASS NAME
export const setFieldClassName = (form: FormGroup, inputName: string, customClassNames: string[] = []): string[] => {
  const classList: string[] = ['form-control', ...customClassNames];

  if (form.get(inputName).touched && form.get(inputName).invalid) classList.push('is-invalid');

  return classList;
};


// SET ERROR CLASS NAME
export const setErrorClassName = (condition: boolean): string[] => {
  const classList: string[] = ['invalid-feedback'];

  if (condition) classList.push('d-block');

  return classList;
};


// GET FIELD ERROR MESSAGES
export const getFieldErrorMessages = (form: FormGroup, inputName: string): boolean => {
  if (form.get(inputName).touched && form.get(inputName).errors) return true;

  return false;
};
