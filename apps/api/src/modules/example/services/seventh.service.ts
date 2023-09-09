import { Injectable } from '@nestjs/common';

@Injectable()
export class SeventhService {
  protected demo = 0;

  async add() {
    this.demo++;
  }

  async find() {
    return this.demo;
  }
}
