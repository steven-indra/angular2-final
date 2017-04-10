import { Pipe } from '@angular/core';

@Pipe({
  name: 'nameList'
})
export class NameListPipe {
  transform(items) {
    var names = [];
    items.forEach(item => {
      if (names.indexOf(item.name) <= -1) {
        names.push(item.name);
      }
    });
    return names.join(', ');
  }
}