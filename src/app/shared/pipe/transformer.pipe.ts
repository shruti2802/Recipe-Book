import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformer'
})
export class TransformerPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let text =  value;
    if (value.includes('_')) {
      text = text.replace('_', ' ');
    }
    if (value.includes('-')) {
      text = text.replace('-', ' ');
    }
    return text;
  }

}
