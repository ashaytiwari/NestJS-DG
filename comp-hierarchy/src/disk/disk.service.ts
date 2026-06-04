import { Injectable } from '@nestjs/common';

import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {

  constructor(private powerService: PowerService) { }

  getData() {
    console.log('Drawing 5 watts of power to read data from disk');
    this.powerService.supplyPower(5);
    return 'Data from disk';
  }

}
