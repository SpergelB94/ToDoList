import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'igennem' })
export class IgenNemPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Igen' : 'Nem';
  }
}
