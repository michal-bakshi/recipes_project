import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseRecipe',
  standalone:true
})
export class UppercaseRecipePipe implements PipeTransform {

 transform(value: string): string {
    return value.toUpperCase();
  }
}
