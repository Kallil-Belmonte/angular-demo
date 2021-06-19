import { FormGroup } from '@angular/forms';

// GROUP ARRAY ITEMS IN ARRAYS
export const groupArrayItemsInArrays = (
  array: any[],
  itemsQuantity: number,
  repeatLastItem?: boolean,
): any[] => {
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

// GET FIELD CLASS
export const getFieldClass = (
  form: FormGroup,
  inputName: string,
  customClassNames: string[] = [],
): string[] => {
  const isInvalid: boolean = form.get(inputName).touched && form.get(inputName).invalid;
  return ['form-control', isInvalid ? 'is-invalid' : '', ...customClassNames];
};

// GET ERROR CLASS
export const getErrorClass = (condition: boolean): string[] => [
  'invalid-feedback',
  condition ? 'd-block' : '',
];

// GET FIELD ERROR MESSAGES
export const getFieldErrorMessages = (form: FormGroup, inputName: string): boolean =>
  !!form.get(inputName).touched && !!form.get(inputName).errors;

// CLEAR FORM MESSAGE
export const clearFormMessage = (field: string[], index: number): void => {
  field.splice(index, 1);
};
