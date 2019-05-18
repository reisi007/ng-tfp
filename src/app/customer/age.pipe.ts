import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'age'})
export class AgePipe implements PipeTransform {
  transform(enteredDateString: string, evaluateDate: string): string {
    if (!(enteredDateString && evaluateDate)) {
      return '?? Jahre';
    }
    const cur = new Date(evaluateDate);
    cur.setHours(23, 59, 0, 0);
    const enteredDate = new Date(enteredDateString);
    enteredDate.setHours(0, 0, 0, 0);
    let ms = cur.getTime() - enteredDate.getTime();
    ms = ms / 1000 / 60 / 60 / 24 / 365.249;
    const detail = 100;
    const calculatedAge = Math.floor(ms * detail) / detail;
    let age = calculatedAge + ' Jahre';
    if (calculatedAge < 18) {
      age += ' -- Minderjährig';
    }
    return age;
  }
}
