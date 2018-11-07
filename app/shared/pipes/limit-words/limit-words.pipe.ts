import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords'
})
export class LimitWordsPipe implements PipeTransform {

  transform(value: string, numberOfWords: number): string {
    if (value.split(' ').length > numberOfWords) {
      return value.split(' ').splice(0, numberOfWords).join(' ') + '...';
    }

    return null;
  }

}
