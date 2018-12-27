export class Utils {

  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // LIMIT WORDS
  static limitWords(string, numberOfWords) {
    return string.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAYS
  static groupArrays(array, itemsQuantity) {
    let newArray = [[]];

    for (let item of array) {
      let lastIndex = newArray.length - 1;

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
  static setInputClassName(form, inputName): string[] {
    let className = ['form-control'];

    if (form.get(inputName).touched && form.get(inputName).invalid) {
      className.push('is-invalid');
    }

    return className;
  }


  // SHOW FIELD ERRORS
  static showFieldErrors(form, inputName): boolean {
    if (form.get(inputName).touched && form.get(inputName).errors) {
      return true;
    }

    return false;
  }


  // SET ERROR CLASS NAME
  static setErrorClassName(condition): string[] {
    let className: string[] = ['invalid-feedback'];

    if (condition) {
      className.push('d-block');
    }

    return className;
  }

};
