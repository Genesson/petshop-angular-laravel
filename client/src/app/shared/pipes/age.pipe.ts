import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {

    transform(value: Date): string {
        const today = moment();
        const birthdate = moment(value);
        const years = today.diff(birthdate, 'years');
        const months = today.subtract(years, 'years').diff(birthdate, 'months');
        let html = (years > 0) ? (years + ((years === 1) ? ' ano' : ' anos')) : '';
        html += (years > 0 && months > 0) ? ' e ' : '';
        html += (months > 0) ? (months + ((months === 1) ? ' mês' : ' meses')) : '';
        return html;
    }

}
