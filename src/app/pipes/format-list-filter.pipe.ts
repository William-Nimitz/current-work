import { Pipe, PipeTransform } from '@angular/core';
import { FormatSpec } from '../classes/format-spec';

@Pipe({
  name: 'formatListFilter'
})
export class FormatListFilterPipe implements PipeTransform {

  transform(formatList: FormatSpec[], filterRule: any): FormatSpec[] {
    let list = [];
    if (filterRule.display) {
      list = list.concat(formatList.filter(item => item.formatType.toUpperCase().includes('DISPLAY') ));
    }
    if (filterRule.skin) {
      list = list.concat(formatList.filter(item => item.formatType.toUpperCase().includes('SKIN')));
    }
    if (filterRule.video) {
      list = list.concat(formatList.filter(item => item.formatType.toUpperCase().includes('VIDEO')));
    }
    if (filterRule.loremIpsum) {
      list = list.concat(formatList.filter(item => item.formatType.toUpperCase().includes('LOREM IPSUM')));
    }
    if (!filterRule.display && !filterRule.skin && !filterRule.video && !filterRule.loremIpsum) {
      list = list.concat(formatList);
    }
    const data = this.getUnique(list, 'id');

    return data;
  }

  // remove same element in array
  getUnique(arr: any, comp: any): FormatSpec[] {
    const unique = arr.map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
  }
}
