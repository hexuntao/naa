import { Injectable } from '@nestjs/common';

import { SeventhService } from './seventh.service';

@Injectable()
export class EighthService {
  constructor(protected seventh: SeventhService) {}

  async echo() {
    await this.seventh.add();
    console.log(`in use service: ${await this.seventh.find()}`);
  }
}
