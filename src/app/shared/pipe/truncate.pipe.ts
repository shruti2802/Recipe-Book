import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number, ...args: any[]): any {
    const text = value.slice(0, length) + '...';
    return text;
  }

}
