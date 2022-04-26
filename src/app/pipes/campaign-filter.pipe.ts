import { Pipe, PipeTransform } from '@angular/core';
import { using } from 'rxjs';
import { log } from 'util';

@Pipe({
  name: 'campaignFilter'
})
export class CampaignFilterPipe implements PipeTransform {

  transform(list: any, filters: string): any {
    if (filters === '') {
      return list;
    }
    const regex = new RegExp(filters, 'i');
    const filterUser = campaign =>
      (campaign.name.toLowerCase().includes(filters.toLowerCase())
        || (campaign.modificationUser !== null && campaign.modificationUser.toLowerCase().includes(filters.toLowerCase()))
        || (campaign.creation.filter(creation => regex.test(creation.name)).length));
    return list.filter(filterUser);
  }

}
