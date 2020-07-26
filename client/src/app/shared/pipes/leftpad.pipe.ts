import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'leftpad'
})
export class LeftPadPipe implements PipeTransform {

    transform(value: string | number, exponent: number) {
        return (String(0) + value).slice(-exponent);
    }

}
